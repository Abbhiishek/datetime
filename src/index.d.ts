declare module 'date-utils' {
    interface DateUtils {
        constructor(date?: Date): void;
        getSunriseAndSunset(latitude: number, longitude: number): Promise<{ sunrise: Date; sunset: Date }>;
        addDays(days: number): DateUtils;
        subtractDays(days: number): DateUtils;
        diffInDays(otherDate: Date): number;
        formatDate(format?: string): string;
        parseDate(dateString: string): Date;
        formatRelativeTime(date: Date): string;
        convertTimezone(date: Date, fromTimezone: string, toTimezone: string): Date;
        isValidDate(date: Date): boolean;
        workdaysBetween(startDate: Date, endDate: Date): number;
        isHoliday(date: Date, holidays?: string[]): boolean;
        calculateAge(birthdate: string): number;
        getWeekNumber(date: Date): number;
        getQuarter(date: Date): number;
        countdownToFutureDate(futureDate: Date): string;
        getHours(date: Date): number;
        getMinutes(date: Date): number;
        getSeconds(date: Date): number;
        isLeapYear(year: number): boolean;
    }
    const DateUtils: DateUtils;
    export = DateUtils;
}
