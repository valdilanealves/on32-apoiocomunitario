import { Injectable, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable()
export class RolesGuard extends JwtAuthGuard {
  constructor(private readonly usuariosService: UsuariosService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const canActivate = (await super.canActivate(context)) as boolean;

    if (!canActivate) {
      return false;
    }

    const request = context.switchToHttp().getRequest();
    const userId = request.user.id;
    console.log(userId)
    // Verifica se o usuário tem especialização 2
    const user = await this.usuariosService.findOne(userId);
    
    if (user && user.especializacao_id === 2) {
      return true;
    }

    throw new ForbiddenException('You do not have permission to access this resource');
  }
}
