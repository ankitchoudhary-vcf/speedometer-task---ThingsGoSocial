const angleToRadian = (angle) => {
    return angle * (Math.PI / 180);
};

const jsToCssAngle = angle => {
    return angle + 90;
};

const rotationAngle = (startAngle, endAngle, numElements, index) => {
    let angleRange = endAngle - startAngle;
    const angleDelta = angleRange / numElements;

    if (angleRange <= startAngle && angleRange > 0) {
        return angleDelta * index - 180;
    }else if (angle > 0){
        return angleDelta * index + 180;
    } else if (angleRange < 0) {
        return (angleDelta * index) + 180 + angleDelta;
    }
}

const radius = 200;
const diameter = radius * 2;

const circle = document.querySelector('#circular-text');
circle.style.width = `${diameter}px`;
circle.style.height = `${diameter}px`;

const text = circle.innerText;
const characters = text.split(' ');
circle.innerText = null;

// const startAngle = 60;
// const endAngle = -270;

const startAngle = 60;
const endAngle = -270;

let angle = startAngle;
const angleRange = endAngle - startAngle;
const deltaAngle = angleRange / characters.length;

characters.forEach((char, index) => {
    const charElement = document.createElement('span');
    charElement.innerText = char;
    const xPos = radius * (1 + Math.cos(angleToRadian(angle)));
    const yPos = radius * (1 + Math.sin(angleToRadian(angle)));

    const transform = `translate(${xPos}px, ${yPos}px)`;

    const rotateAngle = rotationAngle(startAngle, endAngle, characters.length, index);
    let rotate = `rotate(${rotateAngle}deg)`;

    charElement.style.transform = `${transform} ${rotate}`;

    angle += deltaAngle;
    circle.appendChild(charElement);
});

const lastElementAngle = angle;

const speedInput = document.querySelector('input');
const needle = document.querySelector('#needle');
const digiMeter = document.querySelector('#digi-meter');
const updateNeedle = speed =>  {
    if(typeof speed != "number"){
        speed = Number(speedInput.value);
    }


    const speedRange = Number(speedInput.max - speedInput.min);
    speed /= 10;
    
    if(speed < speedInput.min){
        speed = speedInput.min;
    }else if(speed >= speedInput.max) {
        speed = Number(speedInput.max);
    }
        digiMeter.dataset.speed = speed;
        
    /**
     * Angle {start: 60; end: -240}
     * Speed {start: 0; end: 100}
     * ((current - min value of speed scare) * angleRange / speedRange) + angleMin
     */
    let currentAngle = (
        (speed - speedInput.min) * (angleRange) / speedRange
    ) + startAngle;

    const cssAngle = jsToCssAngle(currentAngle);
    needle.style.transform = `rotate(${cssAngle}deg)`;

}
updateNeedle(speedInput.value);
speedInput.addEventListener('input', updateNeedle);
setTimeout(()=>{
    needle.style.transition ='0.8s ease-in-out';
    const getSpeed = Number(new URL(window.location.href).searchParams.get('speed'));
    updateNeedle( getSpeed);
}, 500)

