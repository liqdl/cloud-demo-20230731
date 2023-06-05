package com.example.login;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
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
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import io.qameta.allure.Feature;
import io.qameta.allure.Story;

@DisplayName("用户登录测试")
// @SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
// @AutoConfigureMockMvc
// 底层用junit SpringJunit4ClassRunner
@RunWith(SpringRunner.class)
// 启动整个Springboot工程
@SpringBootTest(classes = { LoginApplication.class })
// 鼠标选中SpringBootTestDemo后执行Run As -> JUnit Test可以同时执行多个测试
@AutoConfigureMockMvc
public class LoginApplicationTests {

	@Autowired
	private MockMvc mock;

	// @Autowired
	// private IndexController indexController;

	@Feature("登录测试")
	@Story("登录用户测试")
	@Test
	@Description("登录用户测试")
	public void testProcessBooks() throws Exception {
		MvcResult mockResult = mock.perform(MockMvcRequestBuilders.post("/login/postlogin"))
				.andExpect(MockMvcResultMatchers.status().isOk()).andReturn();
		int status = mockResult.getResponse().getStatus();
		System.out.println("---:" + status);
	}

	@Feature("登录测试")
	@Story("登录用户异常测试")
	@Test
	@Description("登录用户异常测试")
	public void testProcessBooksException() throws Exception {
		// isOk()
		// isNotFound
		MvcResult mockResult = mock.perform(MockMvcRequestBuilders.post("/login/aaa"))
				.andExpect(MockMvcResultMatchers.status().isOk()).andReturn();
		int status = mockResult.getResponse().getStatus();
		System.out.println("---:" + status);
	}

	@Feature("登录测试")
	@Story("登录用户测试")
	@Test
	@Description("登录用户权限测试(admin)")
	public void testProcessBooksParamAdmin() throws Exception {
		MultiValueMap user = new LinkedMultiValueMap();
		user.add("username", "1");
		user.add("password", "1");
		user.add("role", "admin");
		MvcResult mockResult = mock.perform(MockMvcRequestBuilders.post("/login/postlogin").params(user))
				.andExpect(MockMvcResultMatchers.status().isOk()).andReturn();
		int status = mockResult.getResponse().getStatus();
		System.out.println("---:" + status);
	}

	@Feature("登录测试")
	@Story("登录用户测试")
	@Test
	@Description("登录用户测试权限(not admin)")
	public void testProcessBooksParamNOTAdmin() throws Exception {
		MultiValueMap user = new LinkedMultiValueMap();
		user.add("username", "2");
		user.add("password", "2");
		user.add("role", "2");
		MvcResult mockResult = mock.perform(MockMvcRequestBuilders.post("/login/postlogin").params(user))
				.andExpect(MockMvcResultMatchers.status().isOk()).andReturn();
		int status = mockResult.getResponse().getStatus();
		System.out.println("---:" + status);
	}

}
