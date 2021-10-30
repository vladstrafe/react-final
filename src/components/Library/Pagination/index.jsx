import './style.scss'

export default function Pagination({ totalShows, showsPerPage, paginate }) {
	const numberOfPages = Math.ceil(totalShows / showsPerPage)
	const pageNumbers = []

	for(let i = 1; i <=	 numberOfPages; i++) {
		pageNumbers.push(i)
	}

	return (
		<ul className="pagination">
			{pageNumbers.map(number => (
				<li className="pagination-item" key={number}>
					<a
						href="!#"
						className="pagination-item__link"
						onClick={e => {
								e.preventDefault()
								paginate(number)
							}
						}
					>
						{number}
					</a>
				</li>
			))}
		</ul>
	)
}