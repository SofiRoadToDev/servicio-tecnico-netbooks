# Sistema de Gestión de Servicio Técnico

Este es un sistema de gestión de servicio técnico para netbooks, construido con Laravel y React (Inertia.js).

## Funcionalidad

La aplicación permite gestionar las siguientes entidades:

*   **Alumnos**: Crear y listar alumnos.
*   **Equipos**: Crear y listar equipos (netbooks).
*   **Servicio Técnico**: Crear y listar registros de servicio técnico, asociando un alumno y un equipo a cada registro.

La navegación se realiza a través de una barra lateral fija que da acceso a las diferentes secciones.

## Puesta en Marcha

Sigue estos pasos para poner en marcha la aplicación en un entorno de desarrollo local.

### Prerrequisitos

*   PHP >= 8.1
*   Composer
*   Node.js & npm
*   Una base de datos (SQLite, MySQL, etc.)

### 1. Clonar el Repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd <NOMBRE_DEL_DIRECTORIO>
```

### 2. Instalar Dependencias

Instala las dependencias de PHP y Node.js.

```bash
composer install
npm install
```

### 3. Configuración del Entorno

Copia el archivo de entorno de ejemplo y genera la clave de la aplicación.

```bash
cp .env.example .env
php artisan key:generate
```

Abre el archivo `.env` y configura las variables de la base de datos (`DB_CONNECTION`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`).

### 4. Migraciones de la Base de Datos

Ejecuta las migraciones para crear las tablas necesarias en la base de datos.

```bash
php artisan migrate
```

### 5. Iniciar los Servidores

Necesitas ejecutar dos servidores simultáneamente: el servidor de Laravel y el servidor de Vite para los assets de frontend.

**En una terminal:**

```bash
php artisan serve
```

**En otra terminal:**

```bash
npm run dev
```

¡Y listo! Ahora puedes acceder a la aplicación en la URL que te indica `php artisan serve` (normalmente `http://127.0.0.1:8000`).