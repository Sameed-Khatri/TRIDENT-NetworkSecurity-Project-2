const express = require('express');
const { exec } = require('child_process');
const app = express();
const cors = require('cors');
const port = 3001;

app.use(cors());

app.get('/start-wireshark', (req, res) => {
    const command = 'PATH=%PATH%;"C:\Program Files\Wireshark\tshark.exe" -i 1 -a duration:15 -w capture.pcap';
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        res.status(500).send(`Error starting Wireshark: ${error.message}`);
        console.log(process.env.PATH);

        return;
      }
      console.log('Wireshark capture in progress......');
      res.send('Wireshark capture in progress......');
    });
});

app.get('/run-python-script', (req, res) => {
    const scriptPath1 = "C:\\Users\\hp\\Desktop\\ML-Script\\Dataset_Generation\\main.py";
    const scriptPath2 = "C:\\Users\\hp\\Desktop\\ML-Script\\Dataset_Generation\\transform.py";
    const scriptPath3 = "C:\\Users\\hp\\Desktop\\ML-Script\\ML-Script\\test2.py";
    const scriptPath4 = "C:\\Users\\hp\\Desktop\\ML-Script\\ML-Script\\test8.py";
    const scriptPath5 = "C:\\Users\\hp\\Desktop\\ML-Script\\ML-Script\\countAttack.py";
    const scriptPath6 = "C:\\Users\\hp\\Desktop\\ML-Script\\ML-Script\\countAttackType.py";
    var traffic;

    exec(`python "${scriptPath1}"`, (error1, stdout1, stderr1) => {
        if (error1) {
            console.error(`exec error for main.py: ${error1}`);
            res.status(500).send(`Error running main.py: ${error1.message}`);
            return;
        }
        console.log(`stdout from main.py: ${stdout1}`);
        console.error(`stderr from main.py: ${stderr1}`);

        // Run transform.py after main.py has finished
        exec(`python "${scriptPath2}"`, (error2, stdout2, stderr2) => {
            if (error2) {
                console.error(`exec error for transform.py: ${error2}`);
                res.status(500).send(`Error running transform.py: ${error2.message}`);
                return;
            }
            console.log(`stdout from transform.py: ${stdout2}`);
            console.error(`stderr from transform.py: ${stderr2}`);

            //Run test2.py after transform.py has finished
            exec(`python "${scriptPath3}"`, (error3, stdout3, stderr3) => {
                if (error3) {
                    console.error(`exec error for test2.py: ${error3}`);
                    res.status(500).send(`Error running test2.py: ${error3.message}`);
                    return;
                }
                console.log(`stdout from test2.py: ${stdout3}`);
                console.error(`stderr from test2.py: ${stderr3}`);

                //Run test8.py after test2.py has finished
                exec(`python "${scriptPath4}"`, (error4, stdout4, stderr4) => {
                    if (error4) {
                        console.error(`exec error for test8.py: ${error4}`);
                        res.status(500).send(`Error running test8.py: ${error4.message}`);
                        return;
                    }
                    console.log(`stdout from test8.py: ${stdout4}`);
                    console.error(`stderr from test8.py: ${stderr4}`);
    
                    //Run countAttack.py after test8.py has finished
                    exec(`python "${scriptPath5}"`, (error5, stdout5, stderr5) => {
                        if (error5) {
                            console.error(`exec error for countAttack.py: ${error5}`);
                            res.status(500).send(`Error running countAttack.py: ${error5.message}`);
                            return;
                        }
                        traffic=stdout5;
                        console.log(`stdout from countAttack.py: ${stdout5}`);
                        console.error(`stderr from countAttack.py: ${stderr5}`);
        
                        //Run countAttackType.py after countAttack.py has finished
                        exec(`python "${scriptPath6}"`, (error6, stdout6, stderr6) => {
                            if (error6) {
                                console.error(`exec error for countAttackType.py: ${error6}`);
                                res.status(500).send(`Error running countAttackType.py: ${error6.message}`);
                                return;
                            }
                            traffic=traffic+'|'+stdout6;
                            console.log(`stdout from countAttackType.py: ${stdout6}`);
                            console.error(`stderr from countAttackType.py: ${stderr6}`);
                            res.status(200).send(traffic);
                                        
                        });
                    });
                });
            });
        });
    });
});




app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
