<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/','AD_Login_Controller@index');

Route::get('admin_login','AD_Login_Controller@index');
Route::post('admin_login_check','AD_Login_Controller@check');
Route::get('logout','AD_Login_Controller@logout');

Route::get('admin_dashboard','AD_Dashboard_Controller@index')->middleware("validadmin");

Route::get('admin_user_details','AD_User_Controller@index')->middleware("validadmin");
Route::get('admin_auth_details','AD_User_Controller@auth_view')->middleware("validadmin");

//Subject Entry
Route::get('subject_entry','AD_Subject_Controller@entry')->middleware("validadmin");
Route::post('subject_store','AD_Subject_Controller@store')->middleware("validadmin");
Route::get('subject_view','AD_Subject_Controller@view')->middleware("validadmin");
Route::get('subject_edit/{sb_code}','AD_Subject_Controller@edit')->middleware("validadmin");
Route::post('subject_update','AD_Subject_Controller@update')->middleware("validadmin");
Route::get('subject_status/{sb_code}','AD_Subject_Controller@changeStatus')->middleware("validadmin");

//Language Entry
Route::get('language_entry','AD_Language_Controller@entry')->middleware("validadmin");
Route::post('language_store','AD_Language_Controller@store')->middleware("validadmin");
Route::get('language_view','AD_Language_Controller@view')->middleware("validadmin");
Route::get('language_edit/{ln_code}','AD_Language_Controller@edit')->middleware("validadmin");
Route::post('language_update','AD_Language_Controller@update')->middleware("validadmin");
Route::get('language_status/{ln_code}','AD_Language_Controller@changeStatus')->middleware("validadmin");

//Material Category Entry
Route::get('material_category_entry','AD_Mat_Category_Controller@entry')->middleware("validadmin");
Route::post('material_category_store','AD_Mat_Category_Controller@store')->middleware("validadmin");

Route::get('material_category_view','AD_Mat_Category_Controller@view')->middleware("validadmin");
Route::get('material_category_edit/{mt_ct_code}','AD_Mat_Category_Controller@edit')->middleware("validadmin");
Route::post('material_category_update','AD_Mat_Category_Controller@update')->middleware("validadmin");
Route::get('material_category_status/{mt_ct_code}','AD_Mat_Category_Controller@changeStatus')->middleware("validadmin");

//Material
Route::get('material_entry','AD_Mat_Upload_Controller@entry')->middleware("validadmin");
Route::get('ad_material_category_details','AD_Mat_Upload_Controller@getCategory');
Route::post('material_store','AD_Mat_Upload_Controller@store')->middleware("validadmin");
Route::get('material_view','AD_Mat_Upload_Controller@view')->middleware("validadmin");

//Material Practise Question
Route::get('material_practise_entry','AD_Mat_Practise_Controller@entry')->middleware("validadmin");
Route::post('material_practise_store','AD_Mat_Practise_Controller@store')->middleware("validadmin");

//Material Practise Question Report
Route::get('material_practise_view_1','AD_Mat_Practise_Controller@view_1')->middleware("validadmin");
Route::post('material_practise_view_2','AD_Mat_Practise_Controller@view_2')->middleware("validadmin");
Route::post('material_practise_view_print','AD_Mat_Practise_Controller@view_print')->middleware("validadmin");

//Material Practise Question Edit
Route::get('material_practise_edit/{mt_ques_id}/{ln_code}','AD_Mat_Practise_Controller@edit')->middleware("validadmin");
Route::post('material_practise_update','AD_Mat_Practise_Controller@update')->middleware("validadmin");

//Model Exam
Route::get('model_exam_entry','AD_MEX_Controller@entry')->middleware("validadmin");
Route::post('model_exam_store','AD_MEX_Controller@store')->middleware("validadmin");
Route::get('model_exam_view','AD_MEX_Controller@view')->middleware("validadmin");

//Model Exam Question
Route::get('model_question_entry','AD_MEX_Question_Controller@entry')->middleware("validadmin");
Route::post('model_question_store','AD_MEX_Question_Controller@store')->middleware("validadmin");
Route::get('model_question_view_1','AD_MEX_Question_Controller@view_1')->middleware("validadmin");
Route::post('model_question_view_2','AD_MEX_Question_Controller@view_2')->middleware("validadmin");
Route::post('model_question_view_print','AD_MEX_Question_Controller@view_print')->middleware("validadmin");
Route::get('model_question_edit/{mq_ques_id}','AD_MEX_Question_Controller@edit')->middleware("validadmin");
Route::post('model_question_update','AD_MEX_Question_Controller@update')->middleware("validadmin");
Route::get('model_question_view_3/{mq_ques_id}','AD_MEX_Question_Controller@view_3')->middleware("validadmin");

Route::get('model_question_entry_1','AD_MEX_Question_Controller@entry_1')->middleware("validadmin");
Route::get('model_question_entry_2','AD_MEX_Question_Controller@entry_2')->middleware("validadmin");

// Model Exam Result
Route::get('model_result_view_1','AD_MEX_Result_Controller@view_1')->middleware("validadmin");
Route::post('model_result_view_2','AD_MEX_Result_Controller@view_2')->middleware("validadmin");
Route::get('model_result_view_3','AD_MEX_Result_Controller@view_3')->middleware("validadmin");

//Daily Task
Route::get('daily_task_entry','AD_Dtask_Controller@entry')->middleware("validadmin");
Route::post('daily_task_store','AD_Dtask_Controller@store')->middleware("validadmin");
Route::get('daily_task_view','AD_Dtask_Controller@view')->middleware("validadmin");
Route::get('daily_task_edit/{dy_code}','AD_Dtask_Controller@edit')->middleware("validadmin");
Route::post('daily_task_update','AD_Dtask_Controller@update')->middleware("validadmin");
Route::get('daily_task_change_status/{dy_code}','AD_Dtask_Controller@changeStatus')->middleware("validadmin");

//Daily Task Question
Route::get('daily_question_entry','AD_Dtask_Question_Controller@entry')->middleware("validadmin");
Route::post('daily_question_store','AD_Dtask_Question_Controller@store')->middleware("validadmin");

Route::get('daily_question_view_1','AD_Dtask_Question_Controller@view_1')->middleware("validadmin");
Route::post('daily_question_view_2','AD_Dtask_Question_Controller@view_2')->middleware("validadmin");
Route::get('daily_question_view_3','AD_Dtask_Question_Controller@view_3')->middleware("validadmin");
Route::post('daily_question_view_print','AD_Dtask_Question_Controller@view_print')->middleware("validadmin");
Route::get('daily_question_edit/{dy_ques_id}','AD_Dtask_Question_Controller@edit')->middleware("validadmin");
Route::post('daily_question_update','AD_Dtask_Question_Controller@update')->middleware("validadmin");

//Daily Task Result
Route::get('daily_result_view_1','AD_Dtask_Result_Controller@view_1')->middleware("validadmin");
Route::post('daily_result_view_2','AD_Dtask_Result_Controller@view_2')->middleware("validadmin");
Route::post('daily_result_view_pdf','AD_Dtask_Result_Controller@view_print')->middleware("validadmin");

//Daily Event
Route::get('daily_event_entry','AD_Devent_Controller@entry')->middleware("validadmin");
Route::post('daily_event_store','AD_Devent_Controller@store')->middleware("validadmin");
Route::get('daily_event_view_1','AD_Devent_Controller@view_1')->middleware("validadmin");
Route::post('daily_event_view_2','AD_Devent_Controller@view_2')->middleware("validadmin");
Route::get('daily_event_edit/{dy_code}','AD_Devent_Controller@edit')->middleware("validadmin");
Route::post('daily_event_update','AD_Devent_Controller@update')->middleware("validadmin");

//Current Affair
Route::get('current_affair_entry','AD_Caffair_Controller@entry')->middleware("validadmin");
Route::post('current_affair_store','AD_Caffair_Controller@store')->middleware("validadmin");
Route::get('current_affair_view','AD_Caffair_Controller@view')->middleware("validadmin");
Route::get('current_affair_edit/{ca_code}','AD_Caffair_Controller@edit')->middleware("validadmin");
Route::post('current_affair_update','AD_Caffair_Controller@update')->middleware("validadmin");
Route::get('current_affair_change_status/{ca_code}','AD_Caffair_Controller@changeStatus')->middleware("validadmin");

//Current Affair Question
Route::get('current_question_entry','AD_Caffair_Question_Controller@entry')->middleware("validadmin");
Route::post('current_question_store','AD_Caffair_Question_Controller@store')->middleware("validadmin");

Route::get('current_question_view_1','AD_Caffair_Question_Controller@view_1')->middleware("validadmin");
Route::post('current_question_view_2','AD_Caffair_Question_Controller@view_2')->middleware("validadmin");
Route::post('current_question_view_print','AD_Caffair_Question_Controller@view_print')->middleware("validadmin");
Route::get('current_question_edit/{ca_ques_id}','AD_Caffair_Question_Controller@edit')->middleware("validadmin");
Route::post('current_question_update','AD_Caffair_Question_Controller@update')->middleware("validadmin");

//Current Affair
Route::get('current_affair_material_entry','AD_Caffair_Material_Controller@entry')->middleware("validadmin");
Route::post('current_affair_material_store','AD_Caffair_Material_Controller@store')->middleware("validadmin");
Route::get('current_affair_material_view','AD_Caffair_Material_Controller@view')->middleware("validadmin");
Route::get('current_affair_material_view_pdf','AD_Caffair_Material_Controller@view_pdf')->middleware("validadmin");
Route::get('current_affair_material_view_pdf_sample','AD_Caffair_Material_Controller@view_pdf_sample')->middleware("validadmin");

//Material Model Entry
Route::get('material_model_entry','AD_Matmodel_Controller@entry')->middleware("validadmin");
Route::post('material_model_store','AD_Matmodel_Controller@store')->middleware("validadmin");
Route::get('material_model_view','AD_Matmodel_Controller@view')->middleware("validadmin");

//Material Model Question Entry
Route::get('material_model_question_entry_1','AD_Matmodel_Question_Controller@entry_1')->middleware("validadmin");
Route::get('material_model_question_entry_2','AD_Matmodel_Question_Controller@entry_2')->middleware("validadmin");
Route::get('material_model_question_entry','AD_Matmodel_Question_Controller@entry')->middleware("validadmin");
Route::post('material_model_question_store','AD_Matmodel_Question_Controller@store')->middleware("validadmin");
Route::get('material_model_question_view_1','AD_Matmodel_Question_Controller@view_1')->middleware("validadmin");
Route::post('material_model_question_view_2','AD_Matmodel_Question_Controller@view_2')->middleware("validadmin");
Route::post('material_model_question_view_print','AD_Matmodel_Question_Controller@view_print')->middleware("validadmin");
Route::get('material_model_question_edit/{mm_ques_id}','AD_Matmodel_Question_Controller@edit')->middleware("validadmin");
Route::post('material_model_question_update','AD_Matmodel_Question_Controller@update')->middleware("validadmin");

//Material Syllabus Entry
Route::get('material_syllabus_entry','AD_Material_Plan_Controller@entry')->middleware("validadmin");
Route::post('material_syllabus_store','AD_Material_Plan_Controller@store')->middleware("validadmin");
Route::get('material_syllabus_view','AD_Material_Plan_Controller@view')->middleware("validadmin");

//Material General Studies
Route::get('material_general_upload_entry','AD_Material_General_Controller@entry')->middleware("validadmin");
Route::get('ad_get_chapter','AD_Material_General_Controller@getChapter');
Route::post('material_general_upload_store','AD_Material_General_Controller@store')->middleware("validadmin");
Route::get('material_general_upload_view','AD_Material_General_Controller@view')->middleware("validadmin");
Route::get('material_general_view_pdf','AD_Material_General_Controller@view_pdf')->middleware("validadmin");
Route::get('material_general_view_pdf_sample','AD_Material_General_Controller@view_pdf_sample')->middleware("validadmin");

//Material General Studies
Route::get('material_general_question_entry_1','AD_Material_GeneralQ_Controller@entry_1')->middleware("validadmin");
Route::get('material_general_question_entry_2','AD_Material_GeneralQ_Controller@entry_2')->middleware("validadmin");
Route::post('material_general_question_store','AD_Material_GeneralQ_Controller@store')->middleware("validadmin");
Route::get('material_general_question_edit/{gs_code}','AD_Material_GeneralQ_Controller@edit')->middleware("validadmin");
Route::post('material_general_question_update','AD_Material_GeneralQ_Controller@update')->middleware("validadmin");

//Material General Studies
Route::get('material_general_question_view_1','AD_Material_GeneralQ_Controller@view_1')->middleware("validadmin");
Route::post('material_general_question_view_2','AD_Material_GeneralQ_Controller@view_2')->middleware("validadmin");

//Material Language Entry
Route::get('material_language_entry','AD_Material_Language_Controller@entry')->middleware("validadmin");
Route::post('material_language_store','AD_Material_Language_Controller@store')->middleware("validadmin");
Route::get('material_language_view','AD_Material_Language_Controller@view')->middleware("validadmin");
Route::get('material_language_edit/{ls_code}','AD_Material_Language_Controller@edit')->middleware("validadmin");
Route::post('material_language_update','AD_Material_Language_Controller@update')->middleware("validadmin");
Route::get('material_language_change_status/{ls_code}','AD_Material_Language_Controller@changeStatus')->middleware("validadmin");

//Material Language Study Entry
Route::get('material_language_study_entry','AD_Material_Language_Study_Controller@entry')->middleware("validadmin");
Route::post('material_language_study_store','AD_Material_Language_Study_Controller@store')->middleware("validadmin");
Route::get('material_language_study_view','AD_Material_Language_Study_Controller@view')->middleware("validadmin");
Route::get('material_language_study_view_pdf','AD_Material_Language_Study_Controller@view_pdf')->middleware("validadmin");
Route::get('material_language_study_view_pdf_sample','AD_Material_Language_Study_Controller@view_pdf_sample')->middleware("validadmin");

//Material Language Question Entry
Route::get('material_language_question_entry_1','AD_Material_LanguageQ_Controller@entry_1')->middleware("validadmin");
Route::get('material_language_question_entry_2','AD_Material_LanguageQ_Controller@entry_2')->middleware("validadmin");
Route::post('material_language_question_store','AD_Material_LanguageQ_Controller@store')->middleware("validadmin");
//Route::get('material_language_question_view_1','AD_Material_LanguageQ_Controller@view_1')->middleware("validadmin");
//Route::post('material_language_question_view_2','AD_Material_LanguageQ_Controller@view_2')->middleware("validadmin");
//Route::post('material_language_question_view_print','AD_Material_LanguageQ_Controller@view_print')->middleware("validadmin");
Route::get('material_language_question_edit/{ls_ques_id}','AD_Material_LanguageQ_Controller@edit')->middleware("validadmin");
Route::post('material_language_question_update','AD_Material_LanguageQ_Controller@update')->middleware("validadmin");

//Mail test
Route::get('send_mail','ANDR_Payment_Controller@send_sample_mail');
Route::get('send_message','ANDR_Payment_Controller@send_message');

//Book Back Entry
Route::get('book_back_entry','AD_Book_Question_Controller@entry')->middleware("validadmin");
Route::post('book_back_store','AD_Book_Question_Controller@store')->middleware("validadmin");
Route::get('book_back_view','AD_Book_Question_Controller@view')->middleware("validadmin");
Route::get('book_back_view_pdf','AD_Book_Question_Controller@view_pdf')->middleware("validadmin");
Route::get('book_back_view_pdf_sample','AD_Book_Question_Controller@view_pdf_sample')->middleware("validadmin");

//Chapter Entry
Route::get('chapter_entry','AD_Chapter_Controller@entry')->middleware("validadmin");
Route::post('chapter_store','AD_Chapter_Controller@store')->middleware("validadmin");
Route::get('chapter_view_1','AD_Chapter_Controller@view_1')->middleware("validadmin");
Route::get('chapter_view_2','AD_Chapter_Controller@view_2')->middleware("validadmin");
Route::get('chapter_view_print','AD_Chapter_Controller@view_print')->middleware("validadmin");
Route::get('chapter_edit/{ch_code}','AD_Chapter_Controller@edit')->middleware("validadmin");
Route::post('chapter_update','AD_Chapter_Controller@update')->middleware("validadmin");
Route::get('chapter_change_status/{ch_code}','AD_Chapter_Controller@changeStatus')->middleware("validadmin");

//HYBRID ANDROID UI
//Material
Route::get('an_material','ANDR_Material_Controller@page_1');
Route::get('an_material_practise','ANDR_Material_Controller@page_2');
Route::get('an_payment','ANDR_Payment_Controller@pay_1');
Route::post('an_payment_store','ANDR_Payment_Controller@pay_2');
Route::get('an_payment_success','ANDR_Payment_Controller@pay_3');
Route::get('an_payment_mpin','ANDR_Payment_Controller@pay_4');
Route::post('an_payment_mpin_update','ANDR_Payment_Controller@mpin_update');


//WEB UI

//USER REGISTRATION
Route::get('register','WEB_Signup_Controller@pay_1');
Route::post('register_store','WEB_Signup_Controller@pay_2');
Route::get('user_payment/{user_code}','WEB_Signup_Controller@pay_3');
Route::get('payment_success','WEB_Signup_Controller@pay_3');
Route::get('payment_mpin','WEB_Signup_Controller@pay_4');

//HOME PAGE
Route::get('home','Home_Controller@index');