//Todo el contenido
var Wrap = React.createClass({
	//Estado Inicial
	getInitialState: function () {
		var tareas = window.localStorage.getItem('tareas');
    if (tareas === null) {
        tareas = [];
    } else {
        tareas = JSON.parse(tareas);
    }
    return {
        tareas: tareas
    };
	},

	//Generar id de la tarea
	generarId: function () {
		return Math.floor(Math.random()*90000) + 10000;
	},

	//Para borrar tarea
	manejoBorrado: function (item) {
		var tareas = this.state.tareas;
		tareas = tareas.filter(function (el) {
			return el.id !== item;
		});
		this.setState({tareas});
		tareas = JSON.stringify(tareas);
		window.localStorage.setItem('tareas', tareas);
		return;
	},

	//Para agregar tarea
	manejoTareas: function (task) {
		var tareas = this.state.tareas;
		var id = this.generarId().toString();
		var realizado = 'false';
		tareas = tareas.concat([{id, task, realizado}]);
		this.setState({tareas});
		tareas = JSON.stringify(tareas);
		window.localStorage.setItem('tareas', tareas);
	},

	//Saber si la tarea esta marcada como realizada
	manejoRealizado: function (item) {
		var tareas = this.state.tareas;
		for (var i in tareas) {
			if (tareas[i].id == item) {
				tareas[i].realizado = tareas[i].realizado === 'true' ? 'false' : 'true';
				break;
			}
		}
		this.setState({tareas});
		tareas = JSON.stringify(tareas);
		window.localStorage.setItem('tareas', tareas);
		return;
	},

	//Renderizado
	render: function() {
		return (
			<div className="container">
        <div className="row">
					<div className="col s12 m10 offset-m1 card-panel grey lighten-5 z-depth-1">
		        <div className="row">
		          <div className="col s12 text-center">
		  				  <h3 className="teal-text">To-Do List</h3>
		          </div>
		          <div className="col s12 l8 offset-l2">
		  				  <List tareas={this.state.tareas} borrarItem={this.manejoBorrado} toggleRealizado={this.manejoRealizado} />
		          </div>
		          <div className="col s12 l8 offset-l2">
		  				  <Form agregarTarea={this.manejoTareas} />
		          </div>
		        </div>
					</div>
				</div>
      </div>
		);
	}
});

//Lista de tareas
var List = React.createClass({
	//Borrar tarea
	borrarItem: function (item) {
		this.props.borrarItem(item);
		return;
	},

	//Alternar estado "realizado"
	toggleRealizado: function (item) {
		this.props.toggleRealizado(item);
		return;
	},

	//Renderizado
	render: function() {
		var listNodes = this.props.tareas.map(function (listItem) {
			return (
				<Item key={listItem.id} item={listItem.id} task={listItem.task} realizado={listItem.realizado} borrarItem={this.borrarItem} toggleRealizado={this.toggleRealizado} />
			);
		},this);
		return (
			<ul className="col s12">
				{listNodes}
			</ul>
		);
	}
});

//Tarea
var Item = React.createClass({
	//Borrar tarea
	borrarItem: function (e) {
		e.preventDefault();
		this.props.borrarItem(this.props.item);
		return;
	},

	//Alternar estado "realizado"
	toggleRealizado: function (e) {
		e.preventDefault();
		this.props.toggleRealizado(this.props.item);
		return;
	},

	//Renderizado
	render: function() {
		var classes = 'col s12 m10 offset-m1',
				btnIcon = 'done',
				btnClasses = 'btn-floating waves-effect waves-light green';

		if (this.props.realizado === 'true') {
			classes = classes + ' item-success';
			btnIcon = 'clear';
			btnClasses = 'btn-floating waves-effect waves-light teal darken-1';
		}
		return (
			<li className={classes}>
        <div className="col s7 m8 text-ellipsis">
          <span className="black-text middle">
				    {this.props.task}
          </span>
        </div>
        <div className="col s5 m4">
  				<div className="horizontal click-to-toggle text-right">
  					<button type="button" className={btnClasses} onClick={this.toggleRealizado}>
							<i className="material-icons">{btnIcon}</i>
						</button>
            <button type="button" className="btn-floating red" onClick={this.borrarItem}>
						  <i className="material-icons">delete</i>
						</button>
  				</div>
        </div>
			</li>
		);
	}
});

//Form para agregar nuevas tareas
var Form = React.createClass({
	//Agregar tarea
	nuevaTarea: function (e) {
		e.preventDefault();
		var task = React.findDOMNode(this.refs.task).value.trim();
		if (!task) {
			return;
		}
		this.props.agregarTarea(task);
		React.findDOMNode(this.refs.task).value = '';
		return;
	},

	//Renderizado
	render: function() {
		return (
      <form className="col s12" onSubmit={this.nuevaTarea}>
        <div className="input-field col s12 m10 offset-m1">
          <input id="task" ref="task" type="text" className="validate" />
          <label for="task">Task</label>
        </div>
        <div className="input-field col s12 m10 offset-m1 text-center">
          <input type="submit" value="Add task" className="waves-effect waves-light btn teal" />
        </div>
      </form>
		);
	}
});

//GitHub Ribbons - https://github.com/blog/273-github-ribbons
var Github = React.createClass({
	render: function() {
		return (
			<div className="github-fork-ribbon-wrapper right-bottom">
	        <div className="github-fork-ribbon">
	            <a href="https://github.com/agodin3z/react-to-do">Fork me on GitHub</a>
	        </div>
	    </div>
		);
	}
});

//Enviando todo a index.html
React.render(<Wrap />, document.getElementById('wrap'));
React.render(<Github />, document.getElementById('github'));
