import React from 'react';

const LoginComponent = (props) => {

	const saveUser = (event) => {
	    props.getName(event.target.name.value);
	    event.preventDefault();
	    event.stopPropagation();
	}

  return (
    <form className="pt-4" onSubmit={saveUser}>
    	<p>Please type your name to start chatting.</p>
	  <div className="row">
	    <div className="col">
	      <input name="name" type="text" className="form-control" placeholder="Type name" />
	    </div>
	    <div className="col">
	      <button type="submit" className="btn btn-primary">Submit</button>
	    </div>
	  </div>
	</form>
  );
}

export default LoginComponent;