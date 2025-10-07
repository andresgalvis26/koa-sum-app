@echo off
echo ================================
echo 🚀 Iniciando Jenkins en Docker
echo ================================

:: Nombre del contenedor
set CONTAINER_NAME=jenkins

:: Puerto local (puedes cambiarlo si lo deseas)
set PORT=9090

:: Crear volumen persistente para Jenkins
docker volume create jenkins_home

:: Ejecutar el contenedor con Docker socket montado
docker run -d ^
  -p %PORT%:8080 ^
  -p 50000:50000 ^
  -v jenkins_home:/var/jenkins_home ^
  -v //var/run/docker.sock:/var/run/docker.sock ^
  --name %CONTAINER_NAME% ^
  jenkins/jenkins:lts

echo.
echo ✅ Jenkins se está ejecutando en http://localhost:%PORT%
echo Usuario inicial y contraseña en: docker logs %CONTAINER_NAME%
pause
