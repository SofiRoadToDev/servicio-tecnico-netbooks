##Migraciones
	Los atributos deben figurar también en protected $fillable dentro del modelo
	str es tipo de datos string
1. Alumno: [apellido:str(30),nombre:str(30), dni:str(8)]
2. Equipo: [num_serie:str(100),marca:str(30), modelo:str(30), caracteristicas:str(texto largo)]
3. ServicioTecnico: [fecha:datetime, alumno:(clave foranea), equipo:(clave foranea), motivo:str(texto largo), estado:enum{ticket_generado, retirado_por_correo,devuelto_reparado, devuelto_sin_reparar}->default ticket_generado]

	usa cascade en update y delete, sigue las convenciones de nombres de laravel para la creación de tablas y modelos.
	en la migración de servicio_tecnico, el atributo estado es un enum con los valores: ticket_generado, retirado_por_correo,devuelto_reparado, devuelto_sin_reparar.
	el valor por defecto es ticket_generado.
