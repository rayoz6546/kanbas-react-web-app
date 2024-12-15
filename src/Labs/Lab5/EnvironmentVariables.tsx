const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export default function EnvironmentVariables() {
    console.log(REMOTE_SERVER)
    let yl = [85,55,67,25,21]; let wm = [100,86,70,39]; let wq = [...yl, 9, 10, 11, wm]
  return (
    <div id="wd-environment-variables">
      <h3>Environment Variables</h3>

      <p>Remote Server: {REMOTE_SERVER}</p><hr/>
      <hr />
      {wq.length}

      <hr />

      <br />
      <br />
    </div>
  );
}
