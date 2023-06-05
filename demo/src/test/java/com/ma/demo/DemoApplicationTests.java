package com.ma.demo;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Description;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import io.qameta.allure.Feature;
import io.qameta.allure.Story;

@DisplayName("图书管理测试")
// @SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
// @AutoConfigureMockMvc
// 底层用junit SpringJunit4ClassRunner
@RunWith(SpringRunner.class)
// 启动整个Springboot工程
@SpringBootTest(classes = { DemoApplication.class })
// 鼠标选中SpringBootTestDemo后执行Run As -> JUnit Test可以同时执行多个测试
@AutoConfigureMockMvc
public class DemoApplicationTests {

	// @Autowired
	// private WebApplicationContext context;
	// @Autowired
	// private GetStorageController1 getStorageController1;

	@Autowired
	private MockMvc mock;

	// @Before
	// public void setUp() {
	// mock = MockMvcBuilders.standaloneSetup(getStorageController1).build();
	// mock = MockMvcBuilders.webAppContextSetup(context).build();
	// }

	@Feature("单体测试")
	@Story("最大值ID测试")
	@Description("取得最大值ID测试")
	@Test
	public void testGetMaxID() throws Exception {

		// http://localhost:8080/book/getMaxID
		MvcResult mockResult = mock.perform(MockMvcRequestBuilders.get("/book/getMaxID"))
				.andExpect(MockMvcResultMatchers.status().isOk()).andReturn();
		int status = mockResult.getResponse().getStatus();
		System.out.println("---:" + status);
	}

	@Feature("单体测试")
	@Story("全部图书内容测试")
	@Test
	@Description("取得部图书内容测试1")
	public void testGetStorage1() throws Exception {

		// http://localhost:8080/book/getStorage1
		MvcResult mockResult = mock.perform(MockMvcRequestBuilders.get("/book/getStorage1"))
				.andExpect(MockMvcResultMatchers.status().isOk()).andReturn();
		int status = mockResult.getResponse().getStatus();
		System.out.println("---:" + status);
	}

	@Feature("单体测试")
	@Story("全部图书内容测试")
	@Test
	@Description("取得部图书内容测试2")
	public void testGetStorage1AllPath() throws Exception {

		MvcResult mockResult = mock.perform(MockMvcRequestBuilders.get("http://localhost:8080/book/getStorage1"))
				.andExpect(MockMvcResultMatchers.status().isOk()).andReturn();
		int status = mockResult.getResponse().getStatus();
		System.out.println("---:" + status);
	}

	@Feature("单体测试")
	@Story("全部图书内容测试")
	@Test
	@Description("取得部图书内容测试3")
	public void testGetStorage1NotFound() throws Exception {

		MvcResult mockResult = mock.perform(MockMvcRequestBuilders.get("/getStorage1"))
				.andExpect(MockMvcResultMatchers.status().isNotFound()).andReturn();
		int status = mockResult.getResponse().getStatus();
		System.out.println("---:" + status);
	}

	@Feature("单体测试")
	@Story("全部图书内容异常测试")
	@Test
	@Description("取得部图书内容异常测试4")
	public void testGetStorage1Exception() throws Exception {

		// isOk()
		// isNotFound
		MvcResult mockResult = mock.perform(MockMvcRequestBuilders.get("/getStorage1"))
				.andExpect(MockMvcResultMatchers.status().isNotFound()).andReturn();
		int status = mockResult.getResponse().getStatus();
		System.out.println("---:" + status);
	}
}
