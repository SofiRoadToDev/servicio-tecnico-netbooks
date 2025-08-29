# Plan de Seguridad Básico

## Estado Actual
- Breeze ya configurado con sistema de autenticación completo
- Solo `/dashboard` está protegido actualmente
- CRUDs (alumnos, equipos, serviciotecnico) **NO están protegidos**

## Modificaciones Propuestas

### 1. Proteger TODAS las rutas principales
```php
// En web.php - mover estas rutas dentro del middleware auth:
Route::middleware('auth')->group(function () {
    // Rutas existentes del profile...
    Route::resource('alumnos', AlumnoController::class);
    Route::resource('equipos', EquipoController::class);
    Route::resource('serviciotecnico', ServicioTecnicoController::class);
    Route::get('/alumnos/buscar/{dni}', [AlumnoController::class, 'buscarPorDni']);
});
```

### 2. Simplificar autenticación
- **Eliminar**: registro, reset password, verificación email
- **Mantener**: solo login/logout
- **Crear seeder** con tu usuario predefinido

### 3. Limpiar rutas auth.php
- Eliminar rutas innecesarias (register, forgot-password, etc.)
- Mantener solo login/logout

### 4. Redirecciones
- Cambiar redirect después del login: de `/dashboard` a `/` (Home)
- Eliminar middleware `verified` del dashboard

### 5. Crear UserSeeder
- Usuario único con contraseña que definas
- Ejecutar en `DatabaseSeeder.php`

## Seguridad Final
- ✅ Todas las funcionalidades protegidas por login
- ✅ Sin registro público
- ✅ Sin reset de password
- ✅ Acceso directo a funcionalidades principales post-login

## Implementación Completada

### Credenciales por defecto:
- **Email**: admin@servicio-tecnico.local
- **Contraseña**: admin123

### Para ejecutar el seeder:
```bash
php artisan db:seed --class=AdminUserSeeder
```

### Rutas protegidas:
- Todos los CRUDs (alumnos, equipos, serviciotecnico)
- API de búsqueda por DNI
- Profile management