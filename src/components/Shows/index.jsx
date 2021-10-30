import './style.scss'

export default function Shows({ shows }) {
	return (
		<div className="shows">
			{shows.map(show => {
					return (
						<div className="show-card" key={show.id}>
							<img src={show.image.medium} alt="img" className="show-card__img" />
							<h3 className="show-card__title">{show.name}</h3>
							<button
								type="button"
								className="show-card__btn"
							>
								Add to favorites
							</button>
						</div>
					)
				})
			}
		</div>
	)
}
