class GetResponse {
  constructor() {
    this.currentMonth = new Date().getMonth()
    this.currentDay = new Date().getUTCDay()
    this.currentTime = new Date().getUTCHours() + 3
  }

  getSeason() {
    if (this.currentMonth <= 2 || this.currentMonth === 12) return 'Winter'
    else if (this.currentMonth > 2 && this.currentMonth < 6) return 'Spring'
    else if (this.currentMonth > 5 && this.currentMonth < 9) return 'Summer'
    else if (this.currentMonth > 8 && this.currentMonth < 12) return 'Autem'
    else {
      return 'Error Month'
    }
  }

  getDay() {
    const daysOfWeek = ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четверг', "П'ятниця", 'Субота']
    return daysOfWeek[this.currentDay]
  }

  getTime() {
    if (this.currentTime > 5 && this.currentTime <= 11) {
      return 'Ранок'
    } else if (this.currentTime >= 12 && this.currentTime <= 18) {
      return 'Обід'
    } else if (this.currentTime > 18 && this.currentTime < 23) {
      return 'Вечеря'
    } else return 'Ніч'
  }
}

export default new GetResponse()
