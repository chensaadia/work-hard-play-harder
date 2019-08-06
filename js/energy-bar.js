function EnergyBar(value) {
    console.log('in EnergyBar');
    this.value = value;
    this.setValue();
}

EnergyBar.prototype.increase = function(value) {
    this.value += value;
    this.setValue();
};

EnergyBar.prototype.decrease = function(value) {
    this.value -= value;
    this.setValue();
};

EnergyBar.prototype.setValue = function() {
    var elem = document.getElementById('progress_bar');
    if (this.value >= 100) {
        elem.innerText = '100%';
    }
    else if (this.value <= 0) {
        elem.innerText = '0%';
        // todo:: display game over screen
        throw 'No more energy';
    }
    else {
        elem.innerText = this.value.toString() + '%';
        if (this.value > 15) {
            elem.className = 'success';
        }
        else {
            elem.className = 'danger';
        }

        elem.style.width = this.value + '%';
    }
};
