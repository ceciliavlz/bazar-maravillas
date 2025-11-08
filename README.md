## ⚠️ Nota importante

Si ya abriste la página antes del commit donde se agregó el uso de la API, **borrá el `localStorage` del navegador** antes de volver a cargarla.  
Esto se debe a que las versiones anteriores del proyecto guardaban productos localmente, y esos datos tienen un formato distinto al actual (que ahora obtiene los productos desde la API).  

###  Cómo borrar el almacenamiento local

**Opción 1:** desde la consola del navegador  
```
  localStorage.clear();
```
**Opción 2:** desde las herramientas del navegador
```
  DevTools → Application → Storage → Local Storage → Clear all
```

