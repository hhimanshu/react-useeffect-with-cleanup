# Use of `useEffect` React Hook when cleanup is required.

In this codebase, there are 2 top-level components - `Quotes` and `Books`.

When you click on any `button` the currently displayed component will unmount, causing `componentWillUnmount` lifecycle method to be called. This is the place where we perform the cleanups such as unsubscibing to events, closing files to avoid any memory leaks.

The few important points to know about the `useEffect` Hook are
### Keep the dependency array empty when you want the effect to be applied once
```js
function FunctionComponent(props) {
    useEffect(() => {
    fetchFromApi() 
    }, []) // <- Keep this array empty
}
```

Consider fetching from API use case. You probably want to fetch the data once and let the user work with that data. You do not want to trigger the API call everytime a component is updated.

Keeping the second array empty `[]` (dependencies), you tell React, that I do not depend on any `state` or `props` change, so please do not run effect on `componentDidUpdate` lifecycle.

### Trigger effect everytime a `state` or `props` changes
```js
function FunctionComponent(props) {
    const [quotes, setQuotes] = useState([]);
    const {someValue} = props

    useEffect(() => {
        fetchFromApi() 
        }, [quotes, someValue]) // <- run effect when either quotes, or someValue changes
}
```
In this example, if any of the values available in dependency array changes, the effect will run.

### Trigger a cleanup
When using `useEffect`, if your use case needs to clean up the resources at the end, you should return a function that will be called during `componentWillUnmount` lifecycle.

```js
function FunctionComponent(props) {
    const [quotes, setQuotes] = useState([]);
    const {someValue} = props

    useEffect(() => {
        fetchFromApi() 

        return () => {
            console.log("I will start the cleanup")
            doTheCleanUp()
        }
    }, [quotes, someValue]) // <- run effect when either quotes, or someValue changes

}
```
In this example, if you go from `<Quotes/>` to `<Books/>` component, the `componentWillUnmount` will be triggered anf therefore React will call the function returned from the `useEffect`.

Optionally, if you want to trigger a `cleanup` on change of a `state` or `props` change, add a new `useEffect` to do that

```js
function FunctionComponent(props) {
    const [quotes, setQuotes] = useState([]);
    const {someValue} = props

    useEffect(() => {
        fetchFromApi() 
    }, [quotes, someValue]) // <- run effect when either quotes, or someValue changes

    useEffect(() => {
        return () => {
            console.log("I will do the cleanup when someValue changes")
        }        
    }, [someValue])
}
```
Pay attention to the second `useEffect`, it only returns a function that will be triggered for cleanup.