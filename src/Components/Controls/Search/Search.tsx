import React from 'react';
import searchIcon from '../../../assets/img/search-icon.png';

import './Search.scss';

const Search = () => {

    return (
        <div className="search">
            <input type="text" placeholder="Поиск..."/>
            <button>
                <img src={searchIcon} alt="Поиск"/>
            </button>
        </div>
    );

};

export default Search;