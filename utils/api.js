import http from 'http.js' //引入上面封装好的请求方法 
// 获取商品的一级分类，不需要参数 
const app = getApp()
 
const get_score = (user_id) => { 
  console.log(user_id + '执行了 获取积分') 
  return http({ 
    url:'/score', 
    data:{ 
      user_id:user_id 
    } 
  }) 
}; 
 
const getOPENID = (code) => { 
  return http({ 
    url:'/get_open_id', 
    data:{
      appid:app.data.APP_ID,
      secret:app.data.APP_SECRET,
      js_code:code,
      grant_type:'authorization_code'
    }
  }) 
}; 
const daily = (user_id) => { 
  console.log(user_id + '执行了 签到') 
    return http({ 
      url: '/score/daily', 
      data:{ 
        user_id:user_id 
      } 
 
    }) 
} 
const searchCard = (user_id) => { 
  console.log(user_id + '执行了 查询卡牌') 
    return http({ 
      url: '/card/search', 
      data:{ 
        user_id:user_id 
      } 
 
    }) 
} 
const drawCard = (user_id) => { 
  console.log(user_id + '执行了 抽卡') 
    return http({ 
      url: '/card/draw', 
      data:{ 
        user_id:user_id 
      } 
    }) 
} 
const GetCardData = (user_id, card_name) => { 
  console.log(user_id + '执行了 抽卡') 
    return http({ 
      url: '/card/get_data', 
      data:{ 
        user_id:user_id, 
        card: card_name 
      } 
    }) 
} 

// 将方法导出，实现复用 
export default{ 
  get_score,daily,searchCard, drawCard,GetCardData, getOPENID
  }