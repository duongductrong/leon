import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faMinus, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

class Pagination extends React.Component {
    render() {
        const { page, onPage, total, onPagination } = this.props;
        let amount = Math.ceil(total/onPage);
        return (
            <div className="pagination">
                {
                    page > 4 && <button onClick={() => onPagination(1)} className="pagination__page"> First </button>
                }
                {
                    page > 4 && <button onClick={() => onPagination(page - 1)} className="pagination__page"> <FontAwesomeIcon icon={faArrowLeft} /> </button>
                }
                {
                    //----------------------
                    (page - 1 < amount && page < 4) && <button onClick={() => onPagination(1)} className={`pagination__page`}>
                        1
                    </button>
                }
                {
                    (page < amount && page < 4) && <button onClick={() => onPagination(2)} className={`pagination__page`}>
                        2
                    </button>
                }
                {
                    (page + 1 < amount && page < 4) && <button onClick={() => onPagination(3)} className={`pagination__page`}>
                        3
                    </button>
                }
                {
                    (page + 2 <= amount && page < 4) && <button onClick={() => onPagination(4)} className={`pagination__page`}>
                        4
                    </button>
                    //--------------
                }
                {
                    (page > 3 && page - 2 < amount) && <button onClick={() => onPagination(page > 3 ? page - 2 : page)} className={`pagination__page`}>
                        { page > 3 ? page - 2 : 1 }
                    </button>
                }
                {
                    (page > 3 && page - 1 < amount) && <button onClick={() => onPagination(page > 3 ? page - 1 : page)} className={`pagination__page`}>
                        { page > 3 ? page - 1 : 2 }
                    </button>
                }
                {
                    (page > 3 && page <= amount) && <button onClick={() => onPagination(page > 3 ? page : page)} className={`pagination__page`}>
                        { page > 3 ? page : 3 }
                    </button>
                }
                {
                    (page > 3 && page < amount) && <button onClick={() => onPagination(page > 3 ? page + 1 : page)} className={`pagination__page`}>
                        { page > 3 ? page + 1 : 4 }
                    </button>
                }
                {
                    (page > 0 && page <= amount - 1) && <button onClick={() => onPagination(page + 1)} className="pagination__page"> <FontAwesomeIcon icon={faArrowRight} /> </button>
                }
                {
                    (page > 0 && page <= amount) && <button onClick={() => onPagination(amount)} className="pagination__page"> Last {page === amount && "(Max)"} </button>
                }
            </div>
        )
    }
}

Pagination.defaultProps = {
    page: 1,
    onPage: 10,
    total: 100
}

export default Pagination;