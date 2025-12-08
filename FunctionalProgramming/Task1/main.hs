module Main where

-- A pure function: factorial using recursion
factorial :: Integer -> Integer
factorial 0 = 1
factorial n = n * factorial (n - 1)

-- A function to "loop" through numbers and print them
printNumbers :: Int -> IO ()
printNumbers n = mapM_ print [1..n]  -- list + IO action

-- A recursive "loop" that counts down
countdown :: Int -> IO ()
countdown 0 = putStrLn "Lift-off!"
countdown n = do
    print n
    countdown (n - 1)

-- A function with local "variables" (bindings)
squareAndSum :: Int -> Int -> Int
squareAndSum x y =
    let x2 = x * x     -- local binding
        y2 = y * y
    in x2 + y2

main :: IO ()
main = do
    putStrLn "Enter a number for factorial:"
    input <- getLine
    let n = read input :: Integer  -- read input, assign to immutable binding
    putStrLn ("Factorial is: " ++ show (factorial n))

    putStrLn "\nPrinting numbers 1 to 5:"
    printNumbers 5

    putStrLn "\nCountdown from 3:"
    countdown 3

    putStrLn "\nSquare and sum of 3 and 4:"
    print (squareAndSum 3 4)
