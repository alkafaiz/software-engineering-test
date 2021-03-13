import { timestamps } from "./timestamps";

interface Series {
    start_date: Date;
    end_date: Date;
    duration: number;
}

function getLongestSeriesConsecutiveLogins(timestamps: string[]) {
    const MILISECOND = 1000;
    const SECOND = 60;
    const MINUTE = 60;
    const HOUR = 24;

    const timestamp_date = timestamps.map(timestamp => timestamp.split(" ")[0]);
    timestamp_date.sort();

    const login_date_string = timestamp_date.filter(
        (date, index) => timestamp_date.indexOf(date) === index
    );

    const login_date: Date[] = login_date_string.map(date => new Date(date));

    const series_consecutive_logins: Series[] = [];

    let current_start_date: Date;
    let current_end_date: Date;
    let current_duration: number;

    for (let n = 0; n < login_date.length; n++) {
        const date: Date = login_date[n];
        const is_last_item: boolean = n === login_date.length - 1;

        if (n === 0) {
            current_start_date = date;
            current_end_date = date;
            current_duration = 1;
        }

        const next_login = is_last_item ? null : login_date[n + 1];
        const diff_time = is_last_item
            ? 0
            : Math.abs(login_date[n].getTime() - next_login.getTime());
        const diff_days = Math.ceil(
            diff_time / (MILISECOND * SECOND * MINUTE * HOUR)
        );
        const is_consecutive_day: boolean = diff_days === 1;

        if (is_consecutive_day) {
            current_end_date = date;
            current_duration = current_duration + 1;
        } else {
            if (current_duration > 1) {
                series_consecutive_logins.push({
                    start_date: current_start_date,
                    end_date: date,
                    duration: current_duration
                });
            }
            current_start_date = next_login;
            current_end_date = date;
            current_duration = 1;
        }
    }

    series_consecutive_logins.sort((a, b) => b.duration - a.duration);

    return series_consecutive_logins
        .filter(
            series => series.duration === series_consecutive_logins[0].duration
        )
        .map(series => {
            const start_date = `${series.start_date.getFullYear()}-${series.start_date.getMonth() +
                1}-${series.start_date.getDate()}`;
            const end_date = `${series.end_date.getFullYear()}-${series.end_date.getMonth() +
                1}-${series.end_date.getDate()}`;

            return {
                start: start_date,
                end: end_date,
                length: series.duration
            };
        });
}

const longest_series_consecutive_login = getLongestSeriesConsecutiveLogins(
    timestamps
);

console.table(longest_series_consecutive_login);
