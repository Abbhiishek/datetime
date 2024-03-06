class DateUtils {
    constructor(date) {
        this.date = date || new Date();
    }

    // Parse date string into JavaScript Date object
    static parseDate(dateString) {
        return new Date(dateString);
    }

    // Format date in a human-readable relative time format
    static formatRelativeTime(date) {
        const now = new Date();
        const diff = now - date;

        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
        if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    }

    // Convert date between timezones
    static convertTimezone(date, fromTimezone, toTimezone) {
        const fromOffset = date.getTimezoneOffset() * 60000;
        const fromUTC = date.getTime() + fromOffset;
        const toOffset = new Date().toLocaleString("en-US", { timeZone: toTimezone }).getTimezoneOffset() * 60000;
        return new Date(fromUTC + toOffset);
    }

    // Add days to the current date
    addDays(days) {
        const date = new Date(this.date);
        date.setDate(date.getDate() + days);
        return new DateUtils(date);
    }

    // Subtract days from the current date
    subtractDays(days) {
        return this.addDays(-days);
    }

    // Get the difference in days between two dates
    diffInDays(otherDate) {
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        const firstDate = new Date(this.date);
        const secondDate = new Date(otherDate);
        const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
        return diffDays;
    }

    // Check if a given year is a leap year
    static isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    // Format the date in various formats
    formatDate(format = "YYYY-MM-DD") {
        const date = this.date;
        const map = {
            YYYY: date.getFullYear(),
            MM: String(date.getMonth() + 1).padStart(2, "0"),
            DD: String(date.getDate()).padStart(2, "0"),
            HH: String(date.getHours()).padStart(2, "0"),
            mm: String(date.getMinutes()).padStart(2, "0"),
            ss: String(date.getSeconds()).padStart(2, "0"),
        };
        return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (match) => map[match]);
    }

    // Validate if a given date is valid
    static isValidDate(date) {
        return !isNaN(date.getTime());
    }

    // Calculate the number of workdays between two dates
    static workdaysBetween(startDate, endDate) {
        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        let count = 0;
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            const dayOfWeek = currentDate.getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                count++;
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return count;
    }

    // Check if a given date is a holiday
    static isHoliday(date, holidays = []) {
        const formattedDate = date.toISOString().split('T')[0];
        return holidays.includes(formattedDate);
    }

    // Calculate age based on birthdate and current date
    static calculateAge(birthdate) {
        const today = new Date();
        const dob = new Date(birthdate);
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        return age;
    }

    // Calculate the week number of a given date
    static getWeekNumber(date) {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
        const week1 = new Date(d.getFullYear(), 0, 4);
        return 1 + Math.round(((d - week1) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
    }

    // Calculate the quarter of the year for a given date
    static getQuarter(date) {
        const month = date.getMonth() + 1;
        return Math.ceil(month / 3);
    }

    // Countdown timer to a specific future date
    static countdownToFutureDate(futureDate) {
        const now = new Date().getTime();
        const distance = futureDate - now;
        if (distance < 0) {
            return "Expired";
        }
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
}

module.exports = DateUtils;
