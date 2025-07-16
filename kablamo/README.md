This code fixed the three bugs that were stopping the code from compiling.

There are several things I would do differently. This assumes we want to keep it as a class otherwise I recommend we move to a functional component format. The reason for this is that while class is still an accepted approach, the industry has largely moved to function classes.
1: Laps is managed as a class property (this.laps = []) and not a part of React state. This means react will not automatically rerender it. Which is why we are being forced to use a forceUpdate() throughout. This is an 'anti-pattern' and should be avoided. After doing this we will need to use setState to update the laps.
2. I would create a state interface ie.
 interface StopwatchState {
      secondsElapsed: number;
      lastClearedIncrementer: number | null;
      laps: number[];
  }
to keep track of the state and the variables.
3. I would avoid using any for incremeneter, laps or lastClearedIncrement. You should know what value to pass in otherwise you could assign something you don't want to to the variables. Most likely it should be number | null.
4. We can probably used a isRunning variable instead of a lastClearedIncrement to simplify the code as we don't need to check if the timer is stopped by comparing it.
5. There is an asynchronous bug that occurs if you press start to quickly before the state updates for the incrementor. it generates multiple times. This should be fixed or button disabled.
6. Testing file should be added.
