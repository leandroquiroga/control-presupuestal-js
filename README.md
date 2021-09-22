# Control Presupuestal 📑
![presupuesto](https://user-images.githubusercontent.com/80013958/134263886-37dda43f-bd79-4f2e-b576-7301ef59f7e4.gif)

Una pequeña app con la que podes controlar tu presupuesto diaro, semanal, etc. Esta app requiere un monto inicial para poder comenzar, una vez que tenga un presupuesto inicial podemos agregar un gasto con su nombre y monto. Por cada gasto que generamos se nos actualiza el presupuesto, podemos manipular los gastos eliminandolos y al realizar esta acción se nos actualiza el presupuesto.

# Construido con 🛠️
* HTML5
* CSS3
* JavaScript
* Bootstrap

# Funcionalidades ⚙️
## Validaciones 
Esta funcionablidad se basa en dos partes, la primera es para la validación de numeros y texto, la segunda controla la cantindad de monto que tenemos disponible para gastar, en base ese monto te permite generar mas gastos o no.

### Numeros :
Esta validacion no solo se basa en que sea numeros sino que toma ciertas condiciones como por ejemplo:
* Presupuesto inicial con una longitud maxima de 10 cifras
* No admiten numeros negativos 
* No admite el numero 0
* Control de gastos, si no tenemos presupuesto para gastar nos avisara
![Validacion restante](https://user-images.githubusercontent.com/80013958/134263745-0a80d86a-5607-43ef-a137-ba0f0e17b07a.gif)


### Texto : 
En la validaciones de los texto solamente controla que los datos ingresados solo sean de tipos textos. 

## Lista de gastos
La listas de gastos es similar a un TODO list en la que cuando generamos un gasto se nos agrega dinamicamente el tipo de gasto, monto y la opcion de borrar dicho gasto. 

![Listas de gastos](https://user-images.githubusercontent.com/80013958/134263320-71bbf6fc-1263-4a89-8819-f3d5137342bc.png)

## Habilitaciones del formulario de gastos 
Esta formulario necesita un presupuesto inicial para activarse, una vez activado nos permite ingresar gastos a nuesto TODO list. 

## Control de gastos 
Mediante mas gastos generemos menos saldo disponible nos queda por ende la aplicacion nos avisara cuando estemos un saldo de 50% menos al presupuesto inicial, colocandose de un color amarillo, cuando ocupemos el 75% del presupuesto se colocara de color rojo.  
### Saldo restante menor al 50%:
![50%](https://user-images.githubusercontent.com/80013958/134263389-62bc13cf-1567-404b-85ae-7643834a3bf8.png)

### Saldo restante menor al 75%:
![75%](https://user-images.githubusercontent.com/80013958/134263405-8ec2ac5d-662a-4add-bbeb-784eab20cfd4.png)

# Posibles mejoras 🚀
* Modificar el restante cuando agregamos mas presupuesto al que tenemos
* Usar el localStorage para guardar la informacion. 
# Despliegue 📦
[![Netlify Status](https://api.netlify.com/api/v1/badges/cebc1dbb-2669-4083-84bc-81be6ff32801/deploy-status)](https://gastocontrol.netlify.app/)
# Contacto 📫
- [Linkedin](https://www.linkedin.com/in/leanquiroga95/)
- [Frontend Mentor](https://www.frontendmentor.io/profile/leandroquiroga)
- [Email](mailto:leandroquiroga9514@gmail.com)

# Autor 👤
Realizado con ❤️ por [Leandro Quiroga](https://github.com/leandroquiroga);
