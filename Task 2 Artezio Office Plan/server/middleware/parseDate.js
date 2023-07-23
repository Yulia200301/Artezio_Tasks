
export const parseDateToDB = (req, res, next) => {
  try {
    //ММ/ДД/ГГГГ
    const regexPattern = /^(1[0-2]|0?[1-9])\/(3[01]|[12][0-9]|0?[1-9])\/2[0-9]{3}$/

    if (!regexPattern.test(req.body.employedAt)) {
      throw new Error('Произошла одна из следующих ошибок:' +
        '- вид даты не соответствует формату ММ/ДД/ГГГГ;' +
        '- допущена логическая ошибка (13 месяц, 32 день, 3000 год)')
    }

    var stringDateReq = req.body.employedAt

    var day = stringDateReq.slice(3, 5)
    var month = stringDateReq.slice(0, 2)
    var year = stringDateReq.slice(6, 10)

    // ГГГГ-ММ-ДД
    var stringDateRes = year + '-' + month + '-' + day
    req.body.employedAt = stringDateRes

    next()
  } catch (error) {
    res.json({
      message: error.message
    })
  }
}