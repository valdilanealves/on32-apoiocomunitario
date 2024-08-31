-- Tabela de tipos de documentos
CREATE TABLE tipos_documentos (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(50) NOT NULL UNIQUE CHECK (descricao IN ('CPF', 'CRP'))
);

-- Tabela de documentos
CREATE TABLE documentos (
    id SERIAL PRIMARY KEY,
    tipo_documento_id INT NOT NULL,
    valor_documento VARCHAR(50) NOT NULL UNIQUE,
    CONSTRAINT fk_tipo_documento FOREIGN KEY (tipo_documento_id) REFERENCES tipos_documentos(id) ON DELETE RESTRICT
);

-- Tabela de especializações (mães e profissionais de saúde)
CREATE TABLE especializacoes (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(20) NOT NULL UNIQUE CHECK (tipo IN ('mae', 'profissional'))
);

-- Tabela de usuários
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    endereco TEXT NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    especializacao_id INT NOT NULL,
    documento_id INT NOT NULL,
    CONSTRAINT fk_especializacao FOREIGN KEY (especializacao_id) REFERENCES especializacoes(id) ON DELETE RESTRICT,
    CONSTRAINT fk_documento FOREIGN KEY (documento_id) REFERENCES documentos(id) ON DELETE RESTRICT,
    CONSTRAINT ck_telefone CHECK (telefone ~ '^[0-9]{10,11}$'), -- Validação de telefone
    CONSTRAINT ck_email CHECK (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$')
);

-- Índice para otimizar consultas por especialização e documento
CREATE INDEX idx_usuarios_especializacao_documento ON usuarios(especializacao_id, documento_id);

-- Tabela de acompanhamentos
CREATE TABLE acompanhamentos (
    id SERIAL PRIMARY KEY,
    mae_id INT NOT NULL,
    profissional_id INT NOT NULL,
    inicio TIMESTAMP NOT NULL,
    fim TIMESTAMP,
    em_andamento BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_mae_acompanhamento FOREIGN KEY (mae_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    CONSTRAINT fk_profissional_acompanhamento FOREIGN KEY (profissional_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    CONSTRAINT unique_acompanhamento_per_mae UNIQUE (mae_id, em_andamento)
);

-- Trigger para garantir que uma mãe só pode ser acompanhada por um profissional por vez
CREATE OR REPLACE FUNCTION check_acompanhamento()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM acompanhamentos
        WHERE mae_id = NEW.mae_id
          AND em_andamento = TRUE
          AND id <> NEW.id
    ) THEN
        RAISE EXCEPTION 'A mãe já está em acompanhamento com outro profissional.';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_check_acompanhamento
BEFORE INSERT OR UPDATE ON acompanhamentos
FOR EACH ROW
EXECUTE FUNCTION check_acompanhamento();

-- Inserção dos tipos de documentos
INSERT INTO tipos_documentos (descricao)
VALUES ('CPF'), ('CRP');

-- Inserção das especializações
INSERT INTO especializacoes (tipo)
VALUES ('mae'), ('profissional');

-- Exemplo de inserção de documentos
INSERT INTO documentos (tipo_documento_id, valor_documento)
VALUES (1, '123.456.789-00'), -- CPF para mãe
       (2, '123456'); -- CRP para profissional

-- Exemplo de inserção de usuários
INSERT INTO usuarios (nome, telefone, endereco, email, senha, especializacao_id, documento_id)
VALUES ('Maria Silva', '1234567890', 'Rua A, 123', 'maria@exemplo.com', 'senha_mae', 1, 1),
       ('Dr. João Souza', '9876543210', 'Rua B, 456', 'joao@exemplo.com', 'senha_psi', 2, 2);

-- Exemplo de inserção de acompanhamentos
INSERT INTO acompanhamentos (mae_id, profissional_id, inicio, em_andamento)
VALUES (1, 2, NOW(), TRUE);
