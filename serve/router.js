     //路由接口
//导入 jsonwebtoken and 密钥
//config.jwtsecert

const jwt=require('jsonwebtoken')
const config =require('./secert');
const express=require('express');
const router= express.Router();
//导入数据库  sqlFun('sql',[],res=>{})
const sqlFn=require('./mysql');
 
//图片模块
const multer =require('multer');
const fs=require('fs');
//登录接口

/**
 * 语法：
 * 如60，"2 days"，"10h"，"7d"，Expiration time，过期时间
 *  jwt.sign({},'秘钥','过期时间,{expiresIn:20*1,'1day''1h'}')
 */

/**
 * 登录 login
 * 接受的字段：Uid,Upass
 
 */
 router.post('/login', (req, res) => {
    let {username,password}= req.body
    //请求数据库
    let sql = "select * from user where username=? and password=?";
    let arr = [username, password]
    sqlFn(sql, arr, result => {
        if (result.length > 0) {
            let token = jwt.sign({
                username: result[0].username,
                id: result[0].id
            }, config.jwtSecert, {
                expiresIn: 20 * 1
            })
            res.send({
                status: 200,
                data: token
            })
        } else {
            res.send({
                status: 404,
                msg: '信息错误'
            })
        }

    })
})

router.post('/login2', (req, res) => {
    let {username,password } = req.body
    //请求数据库
    let sql = "select * from user2 where username=? and password=?";
    let arr = [username, password]
    sqlFn(sql, arr, result => {
        if (result.length > 0) {
            let token = jwt.sign({
                username: result[0].username,
                id: result[0].id
            }, config.jwtSecert, {
                expiresIn: 20 * 1
            })
            res.send({
                status: 200,
                data: token
            })
        } else {
            res.send({
                status: 404,
                msg: '信息错误'
            })
        }

    })
})


router.post('/login3', (req, res) => {
    let {username,password } = req.body
    //请求数据库
    let sql = "select * from user3 where username=? and password=?";
    let arr = [username, password]
    sqlFn(sql, arr, result => {
        if (result.length > 0) {
            let token = jwt.sign({
                username: result[0].username,
                id: result[0].id
            }, config.jwtSecert, {
                expiresIn: 20 * 1
            })
            res.send({
                status: 200,
                data: token
            })
        } else {
            res.send({
                status: 404,
                msg: '信息错误'
            })
        }

    })
})



/**
 *      注册
 * 参数： 
 */
 router.get("/insetRegister", (req, res) => {
   
    /**
     * 获取参数
     */
     var username = req.query.username || "";
     var name = req.query.name || "";
     var password = req.query.password || "";
     var sex = req.query.sex || "";
     var email = req.query.email || "";
     var phone = req.query.phone || "";
     var time = req.query.time || "";
     var type = req.query.type || "";
     var hobby = req.query.hobby || "";
     var ji = req.query.ji || "";
 
     const sql = "insert into user values (null,?,?,?,?,?,?,?,?,?,?)"
    var arr = [username,name,password,sex,email,phone,time,ji,hobby,type];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "添加成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "添加失败"
            })
        }
    })
})


/**
 * 专家 知识库列表：获取分页 {total:'',arr:[{},{},{}],pagesize:8,}
 * 参数：page 页码
 */
router.get('/bookList', (req, res) => {
    const page = req.query.page || 1;
    const sqlLen = "select * from knowledge where id";
    sqlFn(sqlLen, null, data => {
        let len = data.length;
        const sql = "select * from knowledge order by id desc limit 8 offset " + (page - 1) * 8;
        sqlFn(sql, null, result => {
            if (result.length > 0) {
                res.send({
                    status: 200,
                    data: result,
                    pageSize: 8,
                    total: len
                })
            } else {
                res.send({
                    status: 500,
                    msg: "暂无数据"
                })
            }
        })
    })
})

/**
 *  知识库查询接口 search
 * 参数：search
 */
 router.get("/search", (req, res) => {
    var search = req.query.search;
    const sql = "select * from knowledge where concat(`type`,`time`,`hname`,`name`) like '%" + search + "%'";
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})

  

/**
 * 上传图片 post请求 upload
 * 说明：
 *  1.后台安装 multer 模块   同时引入fs模块
 *  2.router.js入口文件导入模块
 *      const fs=require('fs')
        const multer=require('multer')
 *  3.上传图片 
 * 
 */
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, "./upload/")
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + "-" + file.originalname)
            }
        })
        
        var createFolder = function (folder) {
            try {
                fs.accessSync(folder);
            } catch (e) {
                fs.mkdirSync(folder);
            }
        }
        
        var uploadFolder = './upload/';
        createFolder(uploadFolder);
        var upload = multer({
            storage: storage
        });
        
        router.post('/upload', upload.single('file'), function (req, res, next) {
            var file = req.file;
            console.log('文件类型：%s', file.mimetype);
            console.log('原始文件名：%s', file.originalname);
            console.log('文件大小：%s', file.size);
            console.log('文件保存路径：%s', file.path);
            res.json({
                res_code: '0',
                name: file.originalname,
                url: file.path
            });
        });
        

 /**
 * 知识库添加
 * 参数： 
 */
  router.get("/insertBook", (req, res) => {
    /**
     * 获取参数
     */
     var name = req.query.name || "";
     var type = req.query.type || "";
     var time = req.query.time || "";
     var content = req.query.content || "";
     var hname = req.query.hname || "";
 
      
 
     const sql = "insert into knowledge values (null,?,?,?,?,?)"
    var arr = [type,name,,time,content,hname];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "添加成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "添加失败"
            })
        }
    })
})




/**
 * 专家 知识库删除接口 id
 */
router.get("/deleteBookById", (req, res) => {
    var id = req.query.id;
    const sql = "delete from knowledge where id=?"
    const arr = [id];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "删除成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "删除失败"
            })
        }
    })
})



/**
 * 修改用户信息
 */

 router.get("/updateBook", (req, res) => {
    var id = req.query.id || "";
    var name = req.query.name || "";
    var type = req.query.type || "";
    var time = req.query.time || "";
    var content = req.query.content || "";
    var hname = req.query.hname || "";

    var sql = "update knowledge set name=?,type=?,time=?,content=?,hname=? where id=?";
    var arr = [name,type,time,content,hname,id];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "修改成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "修改失败"
            })
        }
    })
})


/**
 * 新闻列表：获取分页 {total:'',arr:[{},{},{}],pagesize:6,}
 * 参数：page 页码
 */

 router.get('/newsList', (req, res) => {
    const page = req.query.page || 1;
    const sqlLen = "select * from news where id";
    sqlFn(sqlLen, null, data => {
        let len = data.length;
        const sql = "select * from news order by id desc limit 10 offset " + (page - 1) * 10;
        sqlFn(sql, null, result => {
            if (result.length > 0) {
                res.send({
                    status: 200,
                    data: result,
                    pageSize: 8,
                    total: len
                })
            } else {
                res.send({
                    status: 500,
                    msg: "暂无数据"
                })
            }
        })
    })
})

/**
 * 新闻查询接口 search
 * 参数：search
 */
 router.get("/searchNews", (req, res) => {
    var search = req.query.search;
    const sql = "select * from news where concat(`title`,`date`,`text`) like '%" + search + "%'";
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})

  

 /**
 * 新闻添加
 * 参数： username
 */
  router.get("/insertNews", (req, res) => {
    /**
     * 获取参数
     */

     
    var title = req.query.title || "";
    var date = req.query.date || "";
    var text = req.query.text || "";
    
    

    const sql = "insert into news values (null,?,?,?)"
    var arr = [title,text,date];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "添加成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "添加失败"
            })
        }
    })
})




/**
 * 用户删除接口 id
 */
router.get("/deleteNewsById", (req, res) => {
    var id = req.query.id;
    const sql = "delete from news where id=?"
    const arr = [id];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "删除成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "删除失败"
            })
        }
    })
})



/**
 * 修改用户信息
 */

 router.get("/updateNews", (req, res) => {
    
    var id = req.query.id || "";
    var title = req.query.title || "";
    var date = req.query.date || "";
    var text = req.query.text || "";
    
  
    

    var sql = "update news set title=?,date=?,text=?  where id=?";
    var arr = [title,date,text,id];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "修改成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "修改失败"
            })
        }
    })
})


/**
 * 预警列表：获取分页 {total:'',arr:[{},{},{}],pagesize:6,}
 * 参数：page 页码
 */

 router.get('/warnList', (req, res) => {
    const page = req.query.page || 1;
    const sqlLen = "select * from warn where id";
    sqlFn(sqlLen, null, data => {
        let len = data.length;
        const sql = "select * from warn order by id desc limit 15 offset " + (page - 1) * 15;
        sqlFn(sql, null, result => {
            if (result.length > 0) {
                res.send({
                    status: 200,
                    data: result,
                    pageSize: 8,
                    total: len
                })
            } else {
                res.send({
                    status: 500,
                    msg: "暂无数据"
                })
            }
        })
    })
})

/**
 * 新闻查询接口 search
 * 参数：search
 */
 router.get("/searchWarn", (req, res) => {
    var search = req.query.search;
    const sql = "select * from warn where concat(`time`,`name`,`text`,`type`) like '%" + search + "%'";
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})

  

 /**
 * 新闻添加
 * 参数： username
 */
  router.get("/insertWarn", (req, res) => {
    /**
     * 获取参数
     */

     
    var name = req.query.name || "";
    var time = req.query.time || "";
    var text = req.query.text || "";
    var type = req.query.type || "";
    
    

    const sql = "insert into warn values (null,?,?,?,?)"
    var arr = [name,time,text,type];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "添加成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "添加失败"
            })
        }
    })
})




/**
 * 用户删除接口 id
 */
router.get("/deleteWarnById", (req, res) => {
    var id = req.query.id;
    const sql = "delete from warn where id=?"
    const arr = [id];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "删除成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "删除失败"
            })
        }
    })
})



/**
 * 修改用户信息
 */

 router.get("/updateWarn", (req, res) => {
    
    var id = req.query.id || "";
    var name = req.query.name || "";
    var time = req.query.time || "";
    var text = req.query.text || "";
    var type = req.query.type || "";
  
    

    var sql = "update warn set name=?,time=?,text=?,type=?  where id=?";
    var arr = [name,time,text,type,id];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "修改成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "修改失败"
            })
        }
    })
})

/**
 * 知识列表：获取分页 {total:'',arr:[{},{},{}],pagesize:6,}
 * 参数：page 页码
 */

 router.get('/knowlegeList', (req, res) => {
    const page = req.query.page || 1;
    const sqlLen = "select * from knowledge where id";
    sqlFn(sqlLen, null, data => {
        let len = data.length;
        const sql = "select * from knowledge order by id desc limit 6 offset " + (page - 1) * 6;
        sqlFn(sql, null, result => {
            if (result.length > 0) {
                res.send({
                    status: 200,
                    data: result,
                    pageSize: 8,
                    total: len
                })
            } else {
                res.send({
                    status: 500,
                    msg: "暂无数据"
                })
            }
        })
    })
})



/**
 * 用户个人信息：}
 * 参数：page 页码
 */

 router.get('/permList', (req, res) => {
    sqlFn(null, data => {
        let len = data.length;
        const sql =  "select * from user where id" ;
        sqlFn(sql, null, result => {
            if (result.length > 0) {
                res.send({
                    status: 200,
                    data: result,
                    pageSize: 8,
                    total: len
                })
            } else {
                res.send({
                    status: 500,
                    msg: "暂无数据"
                })
            }
        })
    })
})


/**
 * 知识库查询接口 searchWages
 * 参数：searchNotice
 */
 router.get("/searchKnowlege", (req, res) => {
    var search = req.query.search;
    const sql = "select * from knowlege where concat(`type`,`name`,`content`,`hname`) like '%" + search + "%'";
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})



/**
 * 种植户列表：获取分页 {total:'',arr:[{},{},{}],pagesize:8,}
 * 参数：page 页码
 */
 router.get('/userList', (req, res) => {
    const page = req.query.page || 1;
    const sqlLen = "select * from user where id";
    sqlFn(sqlLen, null, data => {
        let len = data.length;
        const sql = "select * from user order by id desc limit 8 offset " + (page - 1) * 8;
        sqlFn(sql, null, result => {
            if (result.length > 0) {
                res.send({
                    status: 200,
                    data: result,
                    pageSize: 8,
                    total: len
                })
            } else {
                res.send({
                    status: 500,
                    msg: "暂无数据"
                })
            }
        })
    })
})

/**
 * 用户查询接口 search
 * 参数：search
 */
 router.get("/searchUser", (req, res) => {
    var search = req.query.search;
    const sql = "select * from user where concat(`time`,`ji`,`sex`,`phone`,`username`,`phone`,`hobby`,`name`) like '%" + search + "%'";
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})

  

 /**
 * 用户添加
 * 参数： username
 */
  router.get("/insertUser", (req, res) => {
    /**
     * 获取参数
     */

     var username = req.query.username || "";
    var name = req.query.name || "";
    var password = req.query.password || "";
    var phone = req.query.phone || "";
    var sex = req.query.sex || "";
    var email = req.query.email || "";
    var time = req.query.time || "";
    var ji = req.query.ji || "";
    var hobby = req.query.hobby || "";
    var type = req.query.type || "";
    

    const sql = "insert into user values (null,?,?,?,?,?,?,?,?,?,?)"
    var arr = [username,name,password,sex,email,phone,time,ji,hobby,type];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "添加成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "添加失败"
            })
        }
    })
})




/**
 * 用户删除接口 id
 */
router.get("/deleteUserById", (req, res) => {
    var id = req.query.id;
    const sql = "delete from user where id=?"
    const arr = [id];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "删除成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "删除失败"
            })
        }
    })
})



/**
 * 修改用户信息
 */

 router.get("/updateUser", (req, res) => {
    var id = req.query.id || "";
    var username = req.query.username || "";
    var name = req.query.name || "";
    var password = req.query.password || "";
    var phone = req.query.phone || "";
    var sex = req.query.sex || "";
    var email = req.query.email || "";
    var time = req.query.time || "";
    var ji = req.query.ji || "";
    var hobby = req.query.hobby || "";
    var type = req.query.type || "";
    

    var sql = "update user set username=?,name=?,password=?,sex=?,email=?,phone=?,time=?,ji=?,hobby=?,type=? where id=?";
    var arr = [username,name,password,sex,email,phone,time,ji,hobby,type,id];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "修改成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "修改失败"
            })
        }
    })
})




/**
 * 专家列表：获取分页 {total:'',arr:[{},{},{}],pagesize:8,}
 * 参数：page 页码
 */
 router.get('/expertList', (req, res) => {
    const page = req.query.page || 1;
    const sqlLen = "select * from user2 where id";
    sqlFn(sqlLen, null, data => {
        let len = data.length;
        const sql = "select * from user2 order by id desc limit 8 offset " + (page - 1) * 8;
        sqlFn(sql, null, result => {
            if (result.length > 0) {
                res.send({
                    status: 200,
                    data: result,
                    pageSize: 8,
                    total: len
                })
            } else {
                res.send({
                    status: 500,
                    msg: "暂无数据"
                })
            }
        })
    })
})

/**
 * 用户查询接口 search
 * 参数：search
 */
 router.get("/searchExpert", (req, res) => {
    var search = req.query.search;
    const sql = "select * from user2 where concat(`time`,`ji`,`sex`,`phone`,`username`,`phone`,`hobby`,`name`) like '%" + search + "%'";
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})

  

 /**
 * 用户添加
 * 参数： username
 */
  router.get("/insertExpert", (req, res) => {
    /**
     * 获取参数
     */

     var username = req.query.username || "";
    var name = req.query.name || "";
    var password = req.query.password || "";
    var phone = req.query.phone || "";
    var sex = req.query.sex || "";
    var email = req.query.email || "";
    var time = req.query.time || "";
    var ji = req.query.ji || "";
    var hobby = req.query.hobby || "";
   
    

    const sql = "insert into user2 values (null,?,?,?,?,?,?,?,?,?)"
    var arr = [username,name,password,sex,email,phone,time,ji,hobby];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "添加成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "添加失败"
            })
        }
    })
})




/**
 * 用户删除接口 id
 */
router.get("/deleteExpertById", (req, res) => {
    var id = req.query.id;
    const sql = "delete from user2 where id=?"
    const arr = [id];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "删除成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "删除失败"
            })
        }
    })
})



/**
 * 修改用户信息
 */

 router.get("/updateExpert", (req, res) => {
    var id = req.query.id || "";
    var username = req.query.username || "";
    var name = req.query.name || "";
    var password = req.query.password || "";
    var phone = req.query.phone || "";
    var sex = req.query.sex || "";
    var email = req.query.email || "";
    var time = req.query.time || "";
    var ji = req.query.ji || "";
    var hobby = req.query.hobby || "";
   
    

    var sql = "update user2 set username=?,name=?,password=?,sex=?,email=?,phone=?,time=?,ji=?,hobby=? where id=?";
    var arr = [username,name,password,sex,email,phone,time,ji,hobby,id];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "修改成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "修改失败"
            })
        }
    })
})

/**
 * 管理员列表：获取分页 {total:'',arr:[{},{},{}],pagesize:8,}
 * 参数：page 页码
 */
 router.get('/adminList', (req, res) => {
    const page = req.query.page || 1;
    const sqlLen = "select * from user3 where id";
    sqlFn(sqlLen, null, data => {
        let len = data.length;
        const sql = "select * from user3 order by id desc limit 8 offset " + (page - 1) * 8;
        sqlFn(sql, null, result => {
            if (result.length > 0) {
                res.send({
                    status: 200,
                    data: result,
                    pageSize: 8,
                    total: len
                })
            } else {
                res.send({
                    status: 500,
                    msg: "暂无数据"
                })
            }
        })
    })
})

/**
 * 用户查询接口 search
 * 参数：search
 */
 router.get("/searchAdmin", (req, res) => {
    var search = req.query.search;
    const sql = "select * from user3 where concat(`time`,`ji`,`sex`,`phone`,`username`,`phone`,`hobby`,`name`) like '%" + search + "%'";
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})

  

 /**
 * 用户添加
 * 参数： username
 */
  router.get("/insertAdmin", (req, res) => {
    /**
     * 获取参数
     */

     var username = req.query.username || "";
    var name = req.query.name || "";
    var password = req.query.password || "";
    var phone = req.query.phone || "";
    var sex = req.query.sex || "";
    var email = req.query.email || "";
    var time = req.query.time || "";
    var ji = req.query.ji || "";
    var hobby = req.query.hobby || "";
    
    

    const sql = "insert into user3 values (null,?,?,?,?,?,?,?,?,?)"
    var arr = [username,name,password,sex,email,phone,time,ji,hobby];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "添加成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "添加失败"
            })
        }
    })
})




/**
 * 用户删除接口 id
 */
router.get("/deleteAdminById", (req, res) => {
    var id = req.query.id;
    const sql = "delete from user3 where id=?"
    const arr = [id];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "删除成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "删除失败"
            })
        }
    })
})



/**
 * 修改用户信息
 */

 router.get("/updateAdmin", (req, res) => {
    var id = req.query.id || "";
    var username = req.query.username || "";
    var name = req.query.name || "";
    var password = req.query.password || "";
    var phone = req.query.phone || "";
    var sex = req.query.sex || "";
    var email = req.query.email || "";
    var time = req.query.time || "";
    var ji = req.query.ji || "";
    var hobby = req.query.hobby || "";
  
    

    var sql = "update user3 set username=?,name=?,password=?,sex=?,email=?,phone=?,time=?,ji=?,hobby=?  where id=?";
    var arr = [username,name,password,sex,email,phone,time,ji,hobby,id];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "修改成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "修改失败"
            })
        }
    })
})



/**
 * 种植户会话列表：获取分页 {total:'',arr:[{},{},{}],pagesize:8,}
 * 参数：page 页码
 */
 router.get('/session1List', (req, res) => {
    const page = req.query.page || 1;
    const sqlLen = "select * from session1 where id";
    sqlFn(sqlLen, null, data => {
        let len = data.length;
        const sql = "select * from session1 order by id desc limit 10 offset " + (page - 1) * 10;
        sqlFn(sql, null, result => {
            if (result.length > 0) {
                res.send({
                    status: 200,
                    data: result,
                    pageSize: 8,
                    total: len
                })
            } else {
                res.send({
                    status: 500,
                    msg: "暂无数据"
                })
            }
        })
    })
})

/**
 * 种植户会话查询接口 search
 * 参数：search
 */
 router.get("/searchSession1", (req, res) => {
    var search = req.query.search;
    const sql = "select * from session1 where concat(`name`) like '%" + search + "%'";
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})


/**
 * 种植户会话删除接口 id
 */
 router.get("/deleteSession1ById", (req, res) => {
    var id = req.query.id;
    const sql = "delete from session1 where id=?"
    const arr = [id];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "删除成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "删除失败"
            })
        }
    })
})



/**
 * 专家会话列表：获取分页 {total:'',arr:[{},{},{}],pagesize:8,}
 * 参数：page 页码
 */
 router.get('/session2tList', (req, res) => {
    const page = req.query.page || 1;
    const sqlLen = "select * from session2 where id";
    sqlFn(sqlLen, null, data => {
        let len = data.length;
        const sql = "select * from session2 order by id desc limit 6 offset " + (page - 1) * 6;
        sqlFn(sql, null, result => {
            if (result.length > 0) {
                res.send({
                    status: 200,
                    data: result,
                    pageSize: 8,
                    total: len
                })
            } else {
                res.send({
                    status: 500,
                    msg: "暂无数据"
                })
            }
        })
    })
})

/**
 * 种植户会话查询接口 search
 * 参数：search
 */
 router.get("/searchSession2", (req, res) => {
    var search = req.query.search;
    const sql = "select * from session2 where concat(`name`) like '%" + search + "%'";
    sqlFn(sql, null, (result) => {
        if (result.length > 0) {
            res.send({
                status: 200,
                result
            })
        } else {
            res.send({
                status: 500,
                msg: "暂无数据"
            })
        }
    })
})


/**
 * 种植户会话删除接口 id
 */
 router.get("/deleteSession2ById", (req, res) => {
    var id = req.query.id;
    const sql = "delete from session2 where id=?"
    const arr = [id];
    sqlFn(sql, arr, result => {
        if (result.affectedRows > 0) {
            res.send({
                status: 200,
                msg: "删除成功"
            })
        } else {
            res.send({
                status: 500,
                msg: "删除失败"
            })
        }
    })
})
module.exports=router