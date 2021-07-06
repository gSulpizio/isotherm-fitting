
[xData, yData]=prepareCurveData(P1,N1);

% Set up fittype and options.
ft = fittype( 'a*b*x/(1+b*x)+c*d*x/(1+d*x)', 'independent', 'x', 'dependent', 'y' );
opts = fitoptions( 'Method', 'NonlinearLeastSquares' );
opts.DiffMaxChange = 0.05;
opts.Display = 'Off';
opts.Lower = [0   0      0    0];
opts.Upper = [0.0882  Inf  Inf    Inf];
opts.MaxFunEvals = 6000;
opts.Robust = 'Bisquare';
opts.StartPoint = [0.10 7e-5 6 5e-6];

% Fit model to data.
[fitresult, gof] = fit( xData, yData, ft, opts );

% Plot fit with data.
figure( 'Name', 'untitled fit 1' );
h = plot( fitresult, xData, yData );
legend( h, 'N1 vs. P1', 'untitled fit 1', 'Location', 'NorthEast' );
% Label axes
xlabel P1
ylabel N1
grid on

A1=coeffvalues(fitresult);

a(1)=A1(1);
b(1)=A1(2);
c(1)=A1(3);
d(1)=A1(4);

Rsq(1)=gof.rsquare;
AdjRsquare(1)=gof.adjrsquare;
dfe(1)=gof.dfe;
rsme(1)=gof.rmse;

[xData, yData]=prepareCurveData(P2,N2);

% Set up fittype and options.
ft = fittype( 'a*b*x/(1+b*x)+c*d*x/(1+d*x)', 'independent', 'x', 'dependent', 'y' );
opts = fitoptions( 'Method', 'NonlinearLeastSquares' );
opts.DiffMaxChange = 0.05;
opts.Display = 'Off';
opts.Lower = [0.02   1.5976e-5      3    4.1012e-6];
opts.Upper = [0.5736 Inf  6    4.8675e-6];
opts.MaxFunEvals = 6000;
opts.Robust = 'Bisquare';
opts.StartPoint = [0.22 2.4e-5 6 6e-7];

% Fit model to data.
[fitresult, gof] = fit( xData, yData, ft, opts );

Rsq(2)=gof.rsquare;
AdjRsquare(2)=gof.adjrsquare;
dfe(2)=gof.dfe;
rsme(2)=gof.rmse;

% Plot fit with data.
figure( 'Name', 'untitled fit 1' );
h = plot( fitresult, xData, yData );
legend( h, 'N2 vs. P2', 'untitled fit 1', 'Location', 'NorthEast' );
% Label axes
xlabel P2
ylabel N2
grid on

A2=coeffvalues(fitresult);
a(2)=A2(1);
b(2)=A2(2);
c(2)=A2(3);
d(2)=A2(4);

[xData, yData]=prepareCurveData(P3,N3);

% Set up fittype and options.
ft = fittype( 'a*b*x/(1+b*x)+c*d*x/(1+d*x)', 'independent', 'x', 'dependent', 'y' );
opts = fitoptions( 'Method', 'NonlinearLeastSquares' );
opts.DiffMaxChange = 0.05;
opts.Display = 'Off';
opts.Lower = [0    0      0    0];
opts.Upper = [Inf  Inf  Inf    Inf];

%opts.Lower = [0.2   1e-6      0    0];
%opts.Upper = [0.7  Inf  15    8e-7];
opts.MaxFunEvals = 6000;
opts.Robust = 'Bisquare';
opts.StartPoint = [0.54 1e-5 4 1e-6];
% Fit model to data.
[fitresult, gof] = fit( xData, yData, ft, opts );

Rsq(3)=gof.rsquare;
AdjRsquare(3)=gof.adjrsquare;
dfe(3)=gof.dfe;
rsme(3)=gof.rmse;

% Plot fit with data.
figure( 'Name', 'untitled fit 1' );
h = plot( fitresult, xData, yData );
legend( h, 'N3 vs. P3', 'untitled fit 1', 'Location', 'NorthEast' );
% Label axes
xlabel P3
ylabel N3
grid on

A3=coeffvalues(fitresult);
a(3)=A3(1);
b(3)=A3(2);
c(3)=A3(3);
d(3)=A3(4);

% T1=str2num(T1);
% T2=str2num(T2);
% T3=str2num(T3);

Temp(1)=T1;
Temp(2)=T2;
Temp(3)=T3;

lengthb=length(b);

for i=1:length(b)
    Lnb(i)=log(b(i));
    Tinv(i)=1/Temp(i);
    Lnd(i)=log(d(i));

end

qsata=a(2);
qsatb=c(2);
mdl=LinearModel.fit(Tinv,Lnb);
aa=mdl.Coefficients(2,1);
aaa=mdl.Coefficients(1,1);
slopea=aa.Estimate(1);
Intercepta=aaa.Estimate(1);
b0a=exp(Intercepta); 
R=8.3144598;
Ea=R*slopea;
RsqEa=mdl.Rsquared.ordinary(1);

mdl=LinearModel.fit(Tinv,Lnd);
aa2=mdl.Coefficients(2,1);
aaa2=mdl.Coefficients(1,1);
slopeb=aa2.Estimate(1);
Interceptb=aaa2.Estimate(1);
b0b=exp(Interceptb);
R=8.3144598;
Eb=R*slopeb;
RsqEb=mdl.Rsquared.ordinary(1);



Nmax(1)=max(N1);
Nmax(2)=max(N2);
Nmax(3)=max(N3);

Nmaxtot=max(Nmax);
steps=1000;
interval=Nmaxtot/steps;
% 
% ba=b(2);
% bb=d(2);
% i=0;
% for q=0:interval:Nmaxtot
%     i=i+1;
%     T=T2;
%     qload(i)=q;
%     babb(i)=b0a*b0b*exp((Ea+Eb)/(R*T));
%     rondbabb(i)=-b0a*b0b*exp((Ea+Eb)/(R*T))*((Ea+Eb)/(R*T^2));
%     rondba(i)=-b0a*exp((Ea)/(R*T))*((Ea)/(R*T^2));
%     rondbb(i)=-b0b*exp((Eb)/(R*T))*((Eb)/(R*T^2));
%     
%     alpha(i)=(qsata+qsatb-q)*ba*bb;
%     beta(i)=(qsata-q)*ba+(qsatb-q)*bb;
%     
%     rondalpha(i)=(qsata+qsatb-q)*rondbabb(i);
%     rondbeta(i)=(qsata-q)*rondba(i)+(qsatb-q)*rondbb(i);
%     rondlnp(i)=(1/(sqrt(beta(i)^2+4*alpha(i)*q)-beta(i))*(1/(2*sqrt(beta(i)^2+4*alpha(i)*q))*(2*beta(i)*rondbeta(i)+4*q*rondalpha(i))-rondbeta(i)))-1/alpha(i)*rondalpha(i);
%    Q(i)=R*T^2*rondlnp(i); 
% end

i=0;
% Nstart=Nmaxtot/interval;

for n=interval:interval:Nmaxtot
i=i+1;
if n<Nmax(3)
    x0=n/Nmax(1)*100000;
    
    %283K
    AA=a(1);
    BB=b(1);
CC=c(1);
DD=d(1);
alpha(i)=(AA+CC-n)*BB*DD;
beta(i)=(AA-n)*BB+(CC-n)*DD;
p(1)=(-beta(i)+sqrt(beta(i)^2+4*alpha(i)*n))/(2*alpha(i));

    %298K
    
      x0=n/Nmax(2)*100000;
    AA=a(2);
BB=b(2);
CC=c(2);
DD=d(2);    
alpha(i)=(AA+CC-n)*BB*DD;
beta(i)=(AA-n)*BB+(CC-n)*DD;
p(2)=(-beta(i)+sqrt(beta(i)^2+4*alpha(i)*n))/(2*alpha(i));
%313K
  x0=n/Nmax(3)*100000;
AA=a(3);
BB=b(3);
CC=c(3);
DD=d(3);
alpha(i)=(AA+CC-n)*BB*DD;
beta(i)=(AA-n)*BB+(CC-n)*DD;
p(3)=(-beta(i)+sqrt(beta(i)^2+4*alpha(i)*n))/(2*alpha(i));

% Finish
T(1)=288;
T(2)=298;
T(3)=308;
Tinv(1)=1/T(1);
Tinv(2)=1/T(2);
Tinv(3)=1/T(3);
p(1)=p(1);
p(2)=p(2);
p(3)=p(3);

PPP(i,1)=p(1);
PPP(i,2)=p(2);
PPP(i,3)=p(2);

lnP(1)=log(p(1));
lnP(2)=log(p(2));
lnP(3)=log(p(3));
mdl=LinearModel.fit(Tinv,lnP);
aa=mdl.Coefficients(2,1);
rsquared2(i)=mdl.Rsquared.ordinary;
slope(i)=aa.Estimate(1);
R=8.3144598;
Q(i)=-R*slope(i);
nn(i)=n;
pp(i,:)=p;
lnpp(i,:)=lnP;
Tinvv(i,:)=Tinv;

qload(i)=n;
    
else
    
    break

end

end
rsquaredav=mean2(rsquared2);
Q=Q/1000;
figure
plot(nn,Q)



% 
% figure 
% plot(qload,Q);



A={'qsata','b0a','Eba','qsatb','b0b','Ebb'};

    A{2,1}=qsata;
    A{2,2}=b0a;
    A{2,3}=Ea;
    A{2,4}=qsatb;
    A{2,5}=b0b;
    A{2,6}=Eb;
 
    
    
filename='dualsitemodelparameters.xlsx';
xlswrite(filename,A);




clear A



A={'qsat1','b1','qsat2','b2'};

    A{2,1}=A1(1);
    A{2,2}=A1(2);
    A{2,3}=A1(3);
    A{2,4}=A1(4);

    
filename='dualsitemodelparameters288.xlsx';
xlswrite(filename,A);

clear A


A={'qsat1','b1','qsat2','b2'};

    A{2,1}=A2(1);
    A{2,2}=A2(2);
    A{2,3}=A2(3);
    A{2,4}=A2(4);

    
filename='dualsitemodelparameters298.xlsx';
xlswrite(filename,A);

clear A


A={'qsat1','b1','qsat2','b2'};

    A{2,1}=A3(1);
    A{2,2}=A3(2);
    A{2,3}=A3(3);
    A{2,4}=A3(4);

    
filename='dualsitemodelparameters308.xlsx';
xlswrite(filename,A);








Lengthiso=length(Q);
B={'loading','Isosteric Heat'};
for i=1:Lengthiso
   B{i+1,1}=qload(1,i);
      B{i+1,2}=Q(1,i);

end
 
    
    
filename='IsostericHeat.xlsx';
xlswrite(filename,B);


C{1,2}='a';
C{1,3}='b';
C{1,4}='c';
C{1,5}='d';
C{2,1}='283K';
C{3,1}='298K';
C{4,1}='313K';
for i=1:3
    C{i+1,2}=a(i);
    C{i+1,3}=b(i);
    C{i+1,4}=c(i);
    C{i+1,5}=d(i);
end

filename='dualsiteparameters.xlsx';
xlswrite(filename,C);