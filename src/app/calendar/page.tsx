'use client'
import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const myEventsList=[
    {
        'title': 'All Day Event very long title',
        'allDay': true,
        'start': new Date(2015, 3, 0),
        'end': new Date(2015, 3, 1)
    },
    {
        'title': 'Long Event',
        'start': new Date(2015, 3, 7),
        'end': new Date(2015, 3, 10)
    },

    {
        'title': 'DTS STARTS',
        'start': new Date(2016, 2, 13, 0, 0, 0),
        'end': new Date(2016, 2, 20, 0, 0, 0)
    },

    {
        'title': 'DTS ENDS',
        'start': new Date(2016, 10, 6, 0, 0, 0),
        'end': new Date(2016, 10, 13, 0, 0, 0)
    },

    {
        'title': 'Some Event',
        'start': new Date(2015, 3, 9, 0, 0, 0),
        'end': new Date(2015, 3, 9, 0, 0, 0)
    },
    {
        'title': 'Conference',
        'start': new Date(2015, 3, 11),
        'end': new Date(2015, 3, 13),
        desc: 'Big conference for important people'
    },
    {
        'title': 'Meeting',
        'start': new Date(2015, 3, 12, 10, 30, 0, 0),
        'end': new Date(2015, 3, 12, 12, 30, 0, 0),
        desc: 'Pre-meeting meeting, to prepare for the meeting'
    },
    {
        'title': 'Lunch',
        'start': new Date(2015, 3, 12, 12, 0, 0, 0),
        'end': new Date(2015, 3, 12, 13, 0, 0, 0),
        desc: 'Power lunch'
    },
    {
        'title': 'Meeting',
        'start': new Date(2015, 3, 12, 14, 0, 0, 0),
        'end': new Date(2015, 3, 12, 15, 0, 0, 0)
    },
    {
        'title': 'Happy Hour',
        'start': new Date(2015, 3, 12, 17, 0, 0, 0),
        'end': new Date(2015, 3, 12, 17, 30, 0, 0),
        desc: 'Most important meal of the day'
    },
    {
        'title': 'Dinner',
        'start': new Date(2015, 3, 12, 20, 0, 0, 0),
        'end': new Date(2015, 3, 12, 21, 0, 0, 0)
    },
    {
        'title': 'Birthday Party',
        'start': new Date(2015, 3, 13, 7, 0, 0),
        'end': new Date(2015, 3, 13, 10, 30, 0)
    },
    {
        'title': 'Birthday Party 2',
        'start': new Date(2015, 3, 13, 7, 0, 0),
        'end': new Date(2015, 3, 13, 10, 30, 0)
    },
    {
        'title': 'Birthday Party 3',
        'start': new Date(2015, 3, 13, 7, 0, 0),
        'end': new Date(2015, 3, 13, 10, 30, 0)
    },
    {
        'title': 'Late Night Event',
        'start': new Date(2015, 3, 17, 19, 30, 0),
        'end': new Date(2015, 3, 18, 2, 0, 0)
    },
    {
        'title': 'Multi-day Event',
        'start': new Date(2015, 3, 20, 19, 30, 0),
        'end': new Date(2015, 3, 22, 2, 0, 0)
    }
]




moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function ReactBigCalendar() {
    const [eventsData, setEventsData] = useState(myEventsList);

    const handleSelect = ({ start, end }:{start:any,end:any}) => {
        console.log(start);
        console.log(end);
        const title = window.prompt("New Event name");
        if (title)
            setEventsData([
                ...eventsData,
                {
                    start,
                    end,
                    title
                }
            ]);
    };
    return (
        <div className="App">
            <Calendar
                views={["day", "agenda", "work_week", "month"]}
                selectable
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="month"
                events={eventsData}
                style={{ height: "100vh" }}
                onSelectEvent={(event) => alert(event.title)}
                onSelectSlot={handleSelect}
            />
        </div>
    );
}
