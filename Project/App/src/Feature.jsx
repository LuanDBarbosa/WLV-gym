function Feature(props) {
	const s = (e) => console.log("Clicked");

  return (<button className = "feature" onClick={s}> <div>
			<img className="feature-img" src={props.image} alt=""></img>
			<h2 className = "feature-title">{props.title}</h2>
			<hr></hr>
			<p className="feature-text">{props.info}</p>
		</div> </button>
  )
}

export default Feature