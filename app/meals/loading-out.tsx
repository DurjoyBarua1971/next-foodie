import classes from './loading.module.css'

export default function MealsLoadingPage() {
  return (
    <div className={classes.loadingContainer}>
      <div className={classes.spinner}>
        <div className={classes.spinnerRing}></div>
        <div className={classes.spinnerRing}></div>
        <div className={classes.spinnerRing}></div>
      </div>
      <p className={classes.loadingText}>Fetching delicious meals...</p>
    </div>
  )
}