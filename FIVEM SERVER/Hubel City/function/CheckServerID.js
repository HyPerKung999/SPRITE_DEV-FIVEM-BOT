const Config_Main = require("../config/main.json");
const CheckChannelID = require("./CheckChannelID");
require("dotenv").config();

module.exports = function Check_ServerID(message) {
  if (Config_Main.Settings[0].Server[0].Enable) {
    if (message.guildId == Config_Main.Settings[0].Server[0].ServerID) {
      CheckChannelID(message)
    } else {
      message.channel
        .send({
          embeds: [
            {
              title: "❌ เกิดข้อผิดพลาด ❌",
              description:
                "**คุณ " +
                message.author.username +
                " ได้ใช้งานคำสั่งบอทในเซิร์ฟเวอร์ที่ไม่ได้กำหนด กรุณาใช้งานคำสั่งบอทในเซิร์ฟเวอร์ที่กำหนดไว้เท่านั้น!!!**",
              color: 16711680,
            },
          ],
        })
        .catch((e) => {
          console.log(e);
        });
    }
  } else {
    CheckChannelID(message)
  }
}
