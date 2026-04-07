const main = async () => {
    console.log('\n-- Task 1 --');
    await import('./task1.js');
    console.log('\n-- Task 2 --');
    await import('./task2.js');
    console.log('\n-- Task 3 --');
    await import('./task3.js');
    console.log('\n-- Task 4 --');
    await import('./task4.js');
};

main();