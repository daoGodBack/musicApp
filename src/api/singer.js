// import jsonp from 'common/js/jsonp'
import {commonParams} from './config'
import axios from 'axios'

/** 老接口 **/
export function getSingerList() {
  const url = '/c-api/v8/fcg-bin/v8.fcg'
  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
    // g_tk: 1664029744
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    let ret = res.data
    console.log(ret)

    return Promise.resolve(res.data)
  })
}
/** 新接口 */
export function getSingerLists() {
  const url = '/u-api/cgi-bin/musicu.fcg'
  const data = Object.assign({}, commonParams, {
    g_tk: '5381',
    lformat: 'jsonp',
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq.json',
    data: {comm: {ct: 24, cv: 0}, singerList: {module: 'Music.SingerListServer', method: 'get_singer_list', param: {area: -100, sex: -100, genre: -100, index: -100, sin: 0, cur_page: 1}}}
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    let ret = res.data
    console.log(ret)

    return Promise.resolve(res.data)
  })
}