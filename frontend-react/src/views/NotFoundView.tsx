/**
 * Component for displaying a "Not Found" view.
 *
 * This component is rendered when the user navigates to a URL that does not exist.
 *
 * @returns {JSX.Element} The rendered component.
 */
function NotFoundView(): JSX.Element {
  return <div>
    <h1>ups!</h1>
    <h1>diese url kennen wir nicht</h1>
  </div>;
}

export default NotFoundView;