import moment from "moment"

export default {
  methods: {
    formatDate(date, format = 'L') {
      if (date) {
        const t = moment(date)

        if (t.isValid()) {
          return t.format(format)
        }

        return false
      }

      return false
    },

    formatTime(date, format = 'LT') {
      if (date) {
        const t = moment(date)

        if (t.isValid()) {
          return t.format(format)
        }

        return false
      }

      return false
    }
  }
}
