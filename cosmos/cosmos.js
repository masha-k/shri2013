/**
 * Создает экземпляр космического корабля.
 * @name Vessel
 * @param {String} name Название корабля.
 * @param {Number}[] position Местоположение корабля.
 * @param {Number} capacity Грузоподъемность корабля.
 */
function Vessel(name, position, capacity) {
	this.name = name;
    this.position = position;
	this.capacity = capacity;
	this.cargoWeight = 0;
	this.currentPlanet = undefined;
}

/**
 * Выводит текущее состояние корабля: имя, местоположение, доступную грузоподъемность.
 * @example
 * vessel.report(); // Грузовой корабль. Местоположение: Земля. Товаров нет.
 * @example
 * vessel.report(); // Грузовой корабль. Местоположение: 50,20. Груз: 200т.
 * @name Vessel.report
 */

Vessel.prototype.report = function() {
		alert('Корабль "' + this.name +'". Местоположение:' + this.position + '. Груз: '+ this.getOccupiedSpace() + "т. из " + this.capacity + ' т.')
	}

/**
 * Выводит количество свободного места на корабле.
 * @name Vessel.getFreeSpace
 */
Vessel.prototype.getFreeSpace = function () {
	return this.capacity - this.cargoWeight;	
}

/**
 * Выводит количество занятого места на корабле.
 * @name Vessel.getOccupiedSpace
 */
Vessel.prototype.getOccupiedSpace = function () {
	return this.cargoWeight;
}

/**
 * Переносит корабль в указанную точку.
 * @param {Number}[]|Planet newPosition Новое местоположение корабля.
 * @example
 * vessel.flyTo([1,1]);
 * @example
 * var earth = new Planet('Земля', [1,1]);
 * vessel.flyTo(earth);
 * @name Vessel.report
 */
Vessel.prototype.flyTo = function (newPosition) {
	if (Object.prototype.toString.call(newPosition) === '[object Array]' && newPosition.length == 2){
		this.position = newPosition;
	} else if(newPosition instanceof Planet){
		this.position = newPosition.position;
	} else {
		throw new Error('Непонятно куда лететь!');
	}
}

/**
 * Создает экземпляр планеты.
 * @name Planet
 * @param {String} name Название Планеты.
 * @param {Number}[] position Местоположение планеты.
 * @param {Number} availableAmountOfCargo Доступное количество груза.
 */
function Planet(name, position, availableAmountOfCargo) {
	this.name = name;
	this.position = position;
	this.availableAmountOfCargo = availableAmountOfCargo;
}

/**
 * Выводит текущее состояние планеты: имя, местоположение, количество доступного груза.
 * @name Planet.report
 */
Planet.prototype.report = function () {
	alert('Планета "' + this.name +'". Местоположение:' + this.position + '. Количество доступного груза: ' + this.getAvailableAmountOfCargo() + ' т.')
}

/**
 * Возвращает доступное количество груза планеты.
 * @name Vessel.getAvailableAmountOfCargo
 */
Planet.prototype.getAvailableAmountOfCargo = function () {
	return this.availableAmountOfCargo;
}

/**
 * Загружает на корабль заданное количество груза.
 * 
 * Перед загрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Загружаемый корабль.
 * @param {Number} cargoWeight Вес загружаемого груза.
 * @name Vessel.loadCargoTo
 */
Planet.prototype.loadCargoTo = function (vessel, cargoWeight) {
	if (vessel.position[0] == this.position[0] && vessel.position[1] == this.position[1]){
		vessel.currentPlanet = this;
		if (vessel.getFreeSpace() < cargoWeight){
			throw new Error('Нужен корабль побольше!');
		} else if(this.getAvailableAmountOfCargo() < cargoWeight){
			throw new Error('На планете нет столько груза!');
		} else {
			vessel.cargoWeight = vessel.cargoWeight + cargoWeight;
			this.availableAmountOfCargo = this.availableAmountOfCargo - cargoWeight;
			return true;
		} 
	} else {	
		throw new Error('До планеты еще надо долететь!');
	}
	
}

/**
 * Выгружает с корабля заданное количество груза.
 * 
 * Перед выгрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Разгружаемый корабль.
 * @param {Number} cargoWeight Вес выгружаемого груза.
 * @name Vessel.unloadCargoFrom
 */
Planet.prototype.unloadCargoFrom = function (vessel, cargoWeight) {
	if (vessel.position[0] == this.position[0] && vessel.position[1] == this.position[1]){
		vessel.currentPlanet = this;
		if (vessel.getOccupiedSpace() >= cargoWeight){
			vessel.cargoWeight = vessel.cargoWeight - cargoWeight;
			this.availableAmountOfCargo = this.availableAmountOfCargo + cargoWeight;
			return true;
		} else {
			throw new Error('Нельзя выгрузить больше, чем есть в наличии на корабле!');
		}
	} else {
		throw new Error('До планеты еще надо долететь!');
	}

}