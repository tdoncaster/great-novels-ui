import React, { useEffect, useState } from 'react'
import Novel from './Novel'
import Search from './Search'
import { retrieveNovels, filterNovels } from '../utils/novels'

export default () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [novelList, setNovelList] = useState([])
  const [filteredNovelList, setFilteredNovelList] = useState([])

  useEffect(() => {
    async function pullData() {
      const novels = await retrieveNovels()

      setNovelList(novels)
      setFilteredNovelList(novels)
    }

    pullData()
  }, [])

  useEffect(() => {
    const filtered = filterNovels(novelList, searchTerm)

    setFilteredNovelList(filtered)
  }, [searchTerm])

  return (
    <div className="page">
      <div className="title">Great Novels</div>
      <Search term={searchTerm} setter={setSearchTerm} />
      {
        filteredNovelList.map(novel => (
          <Novel
            key={novel.id}
            id={novel.id}
            title={novel.title}
            author={`${novel.author.nameFirst} ${novel.author.nameLast}`}
          />
        ))
      }
    </div>
  )
}
