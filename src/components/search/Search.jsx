/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import '@/i18n';

import exit from '@/assets/images/exit.png';
import clock from '@/assets/images/clock.png';

import './Search.scss';

const Search = () => {
  const { t } = useTranslation('search');
  const [input, setInput] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const storedSearch = JSON.parse(localStorage.getItem('recentSearches')) || [];
    setRecentSearches(storedSearch);
  }, []);

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  };

  const performSearch = () => {
    if (input.trim()) {
      const newSearch = {
        index: recentSearches.length > 0 ? recentSearches[0].index + 1 : 1,
        name: input,
      }
      const newSearches = [newSearch, ...recentSearches];
      const limitedSearches = newSearches.slice(0, 10);
      setRecentSearches(limitedSearches);
      localStorage.setItem('recentSearches', JSON.stringify(limitedSearches));
      setInput('');
    }
  };

  const clearAllRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  const removeRecentSearch = (index) => {
    const newSearches = recentSearches.filter(search => search.index !== index);
    setRecentSearches(newSearches);
    localStorage.setItem('recentSearches', JSON.stringify(newSearches));
  };


  return (
    <div className='body-search'>
      <div className='search'>
        <p className='title'><b>{t('search')}</b></p>
        <div className='search-box'>
          <input
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            placeholder={t('search')}
          />

          <div className='group-exit' onClick={() => setInput('')}><img src={exit} /></div>
        </div>
        <div className='search-container'>
          <div className='gr-title'>
            <p><b>{t('recent')}</b></p>
            <p className={`p2 ${recentSearches.length > 0 ? 'clear' : ''}`} onClick={clearAllRecentSearches}>{t('clear')}</p>
          </div>
          <ul className='recent-list'>

            {recentSearches.map(search => (

              <li key={search.index}>
                <div className='recent'>
                  <div className='gr1'>
                    <img src={clock} />
                    <p>{search.name}</p>
                  </div>
                  <img src={exit} onClick={() => removeRecentSearch(search.index)} />
                </div>
              </li>
            ))
            }
          </ul>
        </div>


      </div>
    </div>
  )
}

export default Search