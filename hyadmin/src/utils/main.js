import router from '../router'

//返回上一页
const $backPage = () => {
  router.go(-1)
}
const $getMonth = (month) => {
  if(month.length==1){
    return '0'+month
  }else{
    return month
  }
}
export default
{
  $backPage,
  $getMonth
}