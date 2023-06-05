package com.ma.demo;

import io.qameta.allure.*;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

@Tag("branch-20")
@DisplayName("我自己自动化测试练习")
@Link("https://www.baidu.com")
@Issue("001")
@Severity(SeverityLevel.BLOCKER)
public class MyTests {

    @Feature("单体测试")
    @Story("登录用户确认")
    @Test
    @Description("第一测试用例说明")
    public void StepTest1() {
        step1();
        step2();
    }

    @Step("这是创建部门第一步")
    public void step1() {
        System.out.println("步骤1");
    }

    @Step("这是创建部门第二步")
    public void step2() {
        System.out.println("步骤2");
    }

    @Feature("单体测试")
    @Story("登录用户确认")
    @Test
    @Description("第二测试用例说明")
    public void StepTest2() {
        step1();
        step2();
    }

    /*
     * Features:标注主要功能模块
     * Stories:标注Features功能模块下的分支功能
     * Title:标注Stories下测试用例名称
     * Step:标注测试用例的重要步骤
     * Severity:标注测试用例的重要级别
     * Description: 标注测试用例的描述
     * Issue和TestCaseId据说是可以集成bug管理系统的，没用过，所以不太清楚
     */
    @Feature("单体测试")
    @Story("登录用户确认")
    @Test
    @Description("第三测试用例说明")
    public void StepTest3() {
        step1();
        step2();
    }

}