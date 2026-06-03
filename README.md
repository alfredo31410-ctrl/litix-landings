# LITIX Landings

Micrositio estático para landings independientes de LITIX.

## Landing disponible

- `/litigio-mercantil-gratis/`
- `/gracias-litigio-mercantil/`

## Configuración

Edita `config.js` con el enlace real del grupo de WhatsApp:

```js
window.LITIX_LANDING_CONFIG = {
  whatsappGroupUrl: "URL_REAL_DEL_GRUPO_DE_WHATSAPP",
  thanksUrl: "/gracias-litigio-mercantil/"
};
```

El formulario de ActiveCampaign ya está embebido en el modal con:

```html
<div class="_form_225"></div>
<script src="https://cefincapacitacion.activehosted.com/f/embed.php?id=225" charset="utf-8"></script>
```

En ActiveCampaign, configura la redirección posterior al envío hacia:

```txt
/gracias-litigio-mercantil/
```

El modal también incluye un enlace de respaldo "Ya completé mi registro" por si el formulario embebido no puede redirigir la ventana principal.
