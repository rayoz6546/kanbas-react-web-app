export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <label htmlFor="wd-name">Assignment Name</label>
        <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
        <textarea id="wd-description" cols={40} rows={10}>
          The assignment is available online Submit a link to the landing page of your web application running on Netlify. The landing page should include the following: Your full name and section Links to each of the lab assignments Link to the Kanbas application Links to all relevant source code repositories The Kanbas application should include a Link to navigate back to the landing page.
        </textarea>
        <br />
        <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" value={100} />
          </td>
        </tr>
        
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <td>
            <select id="wd-group">
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            </select>
          </td>
        </tr>

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as">Display Grade as</label>
          </td>
          <td>
            <select id="wd-display-grade-as">
                <option value="Percentage">Percentage</option>
            </select>
          </td>
        </tr>

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select id="wd-submission-type">
                <option value="Online">Online</option>
            </select>
          </td>
        </tr>

        <tr>
            <label>Online Entry Options</label><br/>

            <td align="left" valign="top">
          
            <input type="checkbox" name="wd-text-entry" id="wd-text-entry"/>
            <label htmlFor="wd-text-entry">Text Entry</label><br />
            <input type="checkbox" name="wd-website-url" id="wd-website-url"/>
            <label htmlFor="wd-website-url">Website URL</label><br />
            <input type="checkbox" name="wd-media-recordings" id="wd-media-recordings"/>
            <label htmlFor="wd-media-recordings">Media Recordings</label><br />
            <input type="checkbox" name="wd-student-annotation" id="wd-student-annotation"/>
            <label htmlFor="wd-student-annotation">Student Annotation</label><br />
            <input type="checkbox" name="wd-file-upload" id="wd-file-upload"/>
            <label htmlFor="wd-file-upload">File Uploads</label><br />
          </td>
        </tr>

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-assign-to">Assign to</label> <br />
            <input id="wd-assign-to" value="Everyone" />
            </td>
        </tr>

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-due-date">Due</label> <br />
            <input type="date" 
                    id="wd-due-date" 
                    value="2024-05-13"/> <br />
            </td>
        </tr>

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-available-from">Available from</label> <br />
            <input type="date" 
                    id="wd-available-from" 
                    value="2024-05-06"/> <br />
            </td>
        </tr>

        <tr>            
            <td align="right" valign="top">
            <label htmlFor="wd-available-until">Available Until</label> <br />
            <input type="date" 
                    id="wd-available-until" 
                    value="2024-05-20"/> <br />
            </td>
            </tr>
    
      </table>

      <hr />
           
    <button>Cancel</button>
    <button>Save</button>

    </div>

);}
