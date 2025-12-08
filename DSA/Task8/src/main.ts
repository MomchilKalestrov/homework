type activity = {
    id: string;
    start: number;
    end: number;
};

const selectActivities = (activities: activity[]): activity[] =>
    [ ...activities ]
        .sort((a, b) => a.end - b.end)
        .reduce<{
            selected: activity[];
            lastEnd: number
        }>((acc, curr) => {
            if (curr.start >= acc.lastEnd) {
                acc.selected.push(curr);
                acc.lastEnd = curr.end
            }
            return acc;
        }, {
            selected: [],
            lastEnd: -Infinity
        }).selected;

        
const activities: activity[] = [
    { id: 'a1', start: 1, end: 3 },
    { id: 'a2', start: 0, end: 4 },
    { id: 'a3', start: 1, end: 2 },
    { id: 'a4', start: 4, end: 6 },
    { id: 'a5', start: 2, end: 9 },
    { id: 'a6', start: 5, end: 8 },
    { id: 'a7', start: 3, end: 5 },
    { id: 'a8', start: 4, end: 5 }
];

const result = selectActivities(activities);

console.log('Selected activities:');
result.forEach(a => {
    console.log(`${a.id} | Start: ${a.start} | End: ${a.end}`);
});
