import React, { Component } from 'react';
import ColorScheme from "color-scheme";



class ColorPalette extends Component {

	constructor(props) {
		super(props);
		const { match: { params } } = this.props;

		this.colorPalette = document.getElementById('color-palette');
		this.currentElem = null;
		this.state = {
			colors: params.colors !== undefined ? params.colors.split('-') : null
		}


		window.addEventListener('keydown', (e) => {
			if(e.keyCode===32){
				e.preventDefault();
			 	this.generateColorPalette();
			}else if(e.keyCode===67 && this.currentElem){
				e.preventDefault();
				let targetInput = this.currentElem.querySelector('input[name="color"]');
				targetInput.select();
				document.execCommand("copy");
				this.notification('Color <b>' + targetInput.value +'</b> copied to your clipboard');
			}
		});

	}

	componentDidMount(){
		if(this.state.colors !== undefined){
			if(this.state.colors[0] === "generate"){
				this.generateColorPalette();
			}else if(this.state.colors.length > 1){
				this.colorArr = this.state.colors;
				this.generatePalette(this.colorArr);
			}else{
				this.generateColorPalette();
			}
		}else{
			this.generateColorPalette();
		}
		
/*
		var i;
		var list;
		var url_colors = [];
		list = document.getElementsByClassName("text");
		
		for (i=0;i < list.length;i++)
		{
			url_colors[i] = list[i].innerText;
		}
		console.log(url_colors);*/
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

	generatePalette = (colors) => {
		this.colorPalette = document.getElementById('color-palette');
		this.colorPalette.innerHTML= '';

		colors.forEach(colorStr => {
			let color = '#' + colorStr;
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
		});

		let colorString = colors.join('-');
		this.props.history.push(`/palette/${colorString}`)
	}

	generateColorPalette = () => {
		let colors = [];

		const scheme = new ColorScheme();
		scheme.from_hue(Math.random() * 1000).scheme("contrast").variation("soft");
		colors = scheme.colors();

		let colorArr = colors.splice(0, 5);
		this.generatePalette(colorArr);

	}

	

	render() {

		//console.log(this.props);
		//this.renderRedirect();

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

export default ColorPalette;