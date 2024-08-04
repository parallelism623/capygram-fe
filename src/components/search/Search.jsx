/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import '@/i18n';
import { useNavigate } from 'react-router-dom';

import { getUserByName } from '@/api/authApi/auth';

import exit from '@/assets/images/exit.png';
import clock from '@/assets/images/clock.png';
import account from '@/assets/images/account.png';

import './Search.scss';

const Search = () => {
  const { t } = useTranslation('search');
  const [input, setInput] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [searchResults, setSearchResults] = useState({});

  const navigate = useNavigate();

  useEffect(() => {

    const storedSearch = JSON.parse(localStorage.getItem('recentSearches')) || [];
    setRecentSearches(storedSearch);
    
    const search = async () => {
      if (input.trim()) {
        const UserName = input;
        const results = await getUserByName(UserName);
        setSearchResults(results);
      } else {
        setSearchResults({});
      }
    }

    search();

  }, [input]);

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  };

  const performSearch = () => {
    if (input.trim()) {
      // console.log("results: ", searchResults);
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

  const handleClickSearchResult = (id) => {
    navigate(`/profile/${id}`);
    setSearchResults({});
    performSearch();
  }
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
          {input.trim() === '' && (
            <>
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
            </>
          )}

          {
            input.trim() !== '' && searchResults !== null && (
              <div className='search-result'
                key={searchResults.id}
                onClick={() => handleClickSearchResult(searchResults.id)}
              >
                <div className='result'>
                  <div className='gr1'>
                    <img src={searchResults?.profile?.avatarUrl !== 'string' ? searchResults?.profile?.avatarUrl : account} alt='avatar-user' />
                  </div>
                  <div className='gr2'>
                    <p><b>{searchResults?.userName}</b></p>
                    <p className='fullname'>{searchResults?.profile?.fullName}</p>
                  </div>
                </div>
              </div>
            )
          }
        </div>


      </div>
    </div>
  )
}

export default Search