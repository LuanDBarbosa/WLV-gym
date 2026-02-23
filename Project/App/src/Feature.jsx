function Feature(props) {
  return (
    <button className="feature"> 
        <div className="feature-icon-wrapper">
          <props.icon className="feature-icon" />
        </div>
        <h2 className="feature-title">{props.title}</h2>
        <p className="feature-text">{props.info}</p>
    </button>
  )
}

export default Feature