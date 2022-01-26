## Scripts máquina 2 caso 1 📄

Scripts de la máquina 2 para el caso 1.

### app.mjs

Utilizado por todas máquinas. Despliega un nodo IPFS y sus funcionalidades.
Ejecuta la API Rest y gestiona las peticiones que le llegan.


### sub.mjs
Script ejecutado por la máquina para suscribirse a los canales por los que la
máquina 1 notificará las actualizaciones.

### Ejecución máquina 2:

```
# Despliegue del nodo IPFS y API Rest
ipfs daemon &
node app.mjs
```

```
# Suscripción a los topics
node sub.mjs
```
