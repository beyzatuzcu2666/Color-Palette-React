import React from 'react';
import ColorScheme from "color-scheme";


class App extends React.Component {

	constructor(props) {
		super(props);
		this.colorPalette = document.getElementById('color-palette');
		this.currentElem = null;
		this.state = {};

		window.addEventListener('keydown', (e) => {
			if(e.keyCode===32){
			 	this.generateColorPalette();
			}

			else if(e.keyCode===67 && this.currentElem){
				let targetInput = this.currentElem.querySelector('input[name="color"]');
				targetInput.select();
				document.execCommand("copy");
				this.notification('Color <b>' + targetInput.value +'</b> copied to your clipboard');
			}
			e.preventDefault();
		});

	}

	componentDidMount(){
		this.generateColorPalette();
		var i;
		var list;
		var url_colors = [];
		list = document.getElementsByClassName("text");
		
		for (i=0;i < list.length;i++)
		{
			url_colors[i] = list[i].innerText;
		}
		console.log(url_colors);
	}

	notification(msg){
		let old_div=document.querySelector('.alert');
		if(old_div){
			old_div.parentNode.removeChild(old_div);
		}

		let div=document.createElement('div');
		div.className='alert';
		div.innerHTML= msg;
		document.body.appendChild(div);

		setTimeout(()=> div.classList.add('active'),1);
		setTimeout(()=> div.classList.remove('active'),1000);
	}

	generateColor(){
		let str= 'abcdef0123456789';
		let color= '#';
		
		for(let i=0; i<5; i++){
			color+=str[Math.floor(Math.random() * str.length)];
		}
		return color;
	}

	generateColorPalette = () => {
		this.colorPalette = document.getElementById('color-palette');
		this.colorPalette.innerHTML= '';

		for (let i = 1; i <= 5; i++){
			const scheme = new ColorScheme();
			scheme.from_hue(Math.random() * 1000).scheme("contrast").variation("soft");
			const colors = scheme.colors();
			let color = '#' + colors[i-1];
			let li = document.createElement('li');
			let a = document.createElement('a');

			let spanColor = document.createElement('span');
			spanColor.className = 'color';
			spanColor.style.setProperty('--color', color);

			let spanText = document.createElement('span');
			spanText.className = 'text';
			spanText.innerText = color;

			let input = document.createElement('input');
			input.name = 'color';
			input.value = color;

			a.appendChild(spanColor);
			a.appendChild(spanText);
			a.appendChild(input);
			li.appendChild(a);
			
			this.colorPalette.appendChild(li);
			
			li.addEventListener('mouseover', (e) => {
				this.currentElem = e.target.parentNode;
			});

			li.addEventListener('click', (e) => {
				let targetInput = e.target.parentNode.querySelector('input[name="color"]');
				targetInput.select();
				document.execCommand('copy');
				this.notification('Color <b>' + targetInput.value + '</b> copied to your clipboard');
			});
		}
	}

	render() {
		return (

			<div className = "App" id="App">
				<h3> Color Palette Generator  </h3>
				<ul className="color-palette" id="color-palette">
				</ul>
				<div className="action">
					<button onClick={this.generateColorPalette}> Generate palette </button> 
					<p id="denemeP" > Or just press the "Spacebar" to generate new palettes. </p>
				</div>
				<div className = "shortcut-text" > Click to copy individual color - Press "C" to copy palette </div>
			</div>

		);
	}
}

export default App;