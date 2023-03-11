const Config_Main = require("../config/main.json");
require("dotenv").config();

module.exports = function Check_ChannelID(message) {
  if (Config_Main.Settings[0].Channel[0].Enable) {
    if (message.channelId == Config_Main.Settings[0].Channel[0].ChannelID) {
      //Check_Message(message);
    } else {
      message.channel
        .send({
          embeds: [
            {
              title: "❌ เกิดข้อผิดพลาด ❌",
              description:
                "**คุณ " +
                message.author.username +
                " ได้ใช้งานคำสั่งบอทในช่องที่ไม่ได้กำหนด กรุณาใช้งานคำสั่งบอทในช่องที่กำหนดไว้เท่านั้น!!!**",
              color: 16711680,
            },
          ],
        })
        .catch((e) => {
          console.log(e);
        });
    }
  } else {
    //Check_Message(message);
  }
}